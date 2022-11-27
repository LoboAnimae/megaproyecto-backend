export interface IRequiredAuthenticationResponseProperties {
    token: string;
    userInformation: {
        username: string;
    }
}

export interface IAuthenticationResponse extends IRequiredAuthenticationResponseProperties {
    userInformation: any;
}