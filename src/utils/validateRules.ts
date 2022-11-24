export enum ValideRules {
    login = '(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}',
    password = '(?=.*[A-Z])(?=.*[0-9])[-_A-Za-z0-9]{8,40}',
}
