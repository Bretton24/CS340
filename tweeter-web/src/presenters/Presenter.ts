export interface View {
    displayErrorMessage: (message: string) => void;
}

export class Presenter<V extends View> {
    private _view: V;

    protected constructor(view: V) {
        this._view = view;
    }

    protected get view(): V {
        return this._view;
    }

    public async doFailureReportingOperation(operation: () => Promise<void>,operationDescription: string, finallyCallback?: () => void) {
        try {
            await operation();
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to ${operationDescription} because of exception: ${(error as Error).message}`
            );
        } finally {
            if (finallyCallback) {
                finallyCallback();
            }
        }
    };

    
}