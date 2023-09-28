export interface Message {
    from: string,
    to: string,
    messageType: string,
    template: string,
    language: string,
    params: object,
    text: string
}