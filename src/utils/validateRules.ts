export enum ValidateRules {
    login = '^(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}$',
    password = '^(?=.*[A-Z])(?=.*[0-9])[-_A-Za-z0-9]{8,40}$',
    email = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
    name = '^[A-Z][A-Za-z]+$',
    phone = '^[+?0-9]{10,15}$',
}
