export class StatusState{
    display: string;
    message: string;
    resetHome: boolean;

    StatusState(){
        this.display = "none";
        this.resetHome = false;
    }
}