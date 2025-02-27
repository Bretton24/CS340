import { anything, capture, deepEqual, instance, mock, spy, verify, when } from "@typestrong/ts-mockito";
import { StatusService } from "../../src/model-service/StatusService";
import { PostStatusPresenter, PostStatusView } from "../../src/presenters/PostStatusPresenter"
import React from "react";
import { AuthToken, Status, User } from "tweeter-shared";

describe("PostStatusPresenter", () => {
    let mockPostStatusView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockStatusService: StatusService;
    let mockEvent: React.MouseEvent;
    const post = "Test post";
    const currentUser = new User("bill","johnson","@yahoo","dude");
    const authToken = new AuthToken("abc123", Date.now());

    beforeEach(() => {
            mockPostStatusView = mock<PostStatusView>();
            const mockPostStatusViewInstance = instance(mockPostStatusView);
    
            const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance))
            postStatusPresenter = instance(postStatusPresenterSpy);
    
            mockStatusService = mock<StatusService>();
            const mockStatusServiceInstance = instance(mockStatusService);
    
            when(postStatusPresenterSpy.statusService).thenReturn(mockStatusServiceInstance);

            mockEvent = { preventDefault: jest.fn() } as unknown as React.MouseEvent;
        })

    it("The presenter tells the view to display a posting status message",async () => {
            await postStatusPresenter.submitPost(mockEvent,post,currentUser,authToken);
            verify(mockPostStatusView.displayInfoMessage("Posting status...", 0)).once();
    })

    it("The presenter calls postStatus on the post status service with the correct status string and auth token", async () => {
        await postStatusPresenter.submitPost(mockEvent,post,currentUser,authToken);
        verify(mockStatusService.postStatus(authToken,deepEqual(new Status(post,currentUser, anything())) )).once();
    })

    it("When posting of the status is successful, the presenter tells the view to clear the last info message, clear the post, and display a status posted message", async () => {
        await postStatusPresenter.submitPost(mockEvent,post,currentUser,authToken);
        
        verify(mockPostStatusView.clearPost(mockEvent)).once();

        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).once();
        verify(mockPostStatusView.clearLastInfoMessage()).once();
    })

    it ("When posting of the status is not successful, the presenter tells the view to display an error message and clear the last info message and does not tell it to clear the post or display a status posted message.", async () => {
        const error = new Error("an error occured");
        when(mockStatusService.postStatus(authToken,deepEqual(new Status(post, currentUser, anything())))).thenThrow(error);

        await postStatusPresenter.submitPost(mockEvent,post,currentUser,authToken);

        let [capturedErrorMessage] = capture(mockPostStatusView.displayErrorMessage).last();
        console.log(capturedErrorMessage);

        verify(mockPostStatusView.clearLastInfoMessage()).once();
        verify(mockPostStatusView.clearPost(mockEvent)).never();

        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000)).never();

    })
})