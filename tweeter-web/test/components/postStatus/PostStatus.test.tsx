import {render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import "@testing-library/jest-dom"
import PostStatus from "../../../src/components/postStatus/PostStatus"
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";
import { instance, mock, verify} from "@typestrong/ts-mockito"
import { PostStatusPresenter } from "../../../src/presenters/PostStatusPresenter";
import { AuthToken, User } from "tweeter-shared";  
    

describe("PostStatus Component", () => {
    it("When first rendered the Post Status and Clear buttons are both disabled.", () => {
        const {postStatusButton, clearButton } = renderPostStatusAndGetElements();

        expect(postStatusButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    })

    it("Both buttons are enabled when the text field has text.",async () => {
        const {postStatusButton, clearButton,textField, user } = renderPostStatusAndGetElements();

        expect(postStatusButton).toBeDisabled();
        expect(clearButton).toBeDisabled();

        await user.type(textField, "a");

        waitFor(() => {
            expect(postStatusButton).toBeEnabled();
            expect(clearButton).toBeEnabled();
        })

    })

    it("Both buttons are disabled when the text field is cleared.",async () => {
        const {postStatusButton, clearButton,textField, user } = renderPostStatusAndGetElements();

        await user.type(textField, "a");

        waitFor(() => {
            expect(postStatusButton).toBeEnabled();
            expect(clearButton).toBeEnabled();
        })

        await user.clear(textField)
        
        waitFor(() => {
            expect(postStatusButton).toBeDisabled();
            expect(clearButton).toBeDisabled();
        })

    })

    it("The presenter's postStatus method is called with correct parameters when the Post Status button is pressed.", async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);
        let mockEvent: React.MouseEvent = { preventDefault: jest.fn() } as unknown as React.MouseEvent;
        let post: string = "here is my post";
        const currentUser = new User("bill","johnson","@yahoo","dude");
        const authToken = new AuthToken("abc123", Date.now());

        const {postStatusButton,textField, user } = renderPostStatusAndGetElements(mockPresenterInstance);

        await user.type(textField, post);
        await user.click(postStatusButton);

        verify(mockPresenterInstance.submitPost(mockEvent,post,currentUser,authToken))
    })
})

const renderPostStatus = (presenter?: PostStatusPresenter) => {
    return render(
    <MemoryRouter>
            {!!presenter? (<PostStatus presenter={presenter}/>) : (<PostStatus/>)}
    </MemoryRouter>);
}

const renderPostStatusAndGetElements = (presenter?: PostStatusPresenter) => {
    const user = userEvent.setup();

    renderPostStatus();

    const postStatusButton = screen.getByLabelText("postStatusButton");
    const clearButton = screen.getByLabelText("clearButton");
    const textField = screen.getByLabelText("textField");

    return {postStatusButton, clearButton,textField, user }
}