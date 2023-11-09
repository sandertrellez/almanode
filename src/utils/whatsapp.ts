import "dotenv/config";

class Whatsapp {
    /**
     * Atributos generales 
     */
    private version = 'v17.0';
    private token = process.env.WHATSAPP_TOKEN;
    private idAccount = process.env.WHATSAPP_ID_ACCOUNT;//Se usa para peticion de pantillas
    private idNumber = process.env.WHATSAPP_ID_NUMBER;//Se usa para petición de mensajes
    private url = `https://graph.facebook.com/${this.version}/`;

    /**
     * Atributos de message
     */
    private to: string | undefined;
    private messageType: string | undefined;
    private template: string | undefined;
    private params: object | undefined;

    /**
     * Atributos de template
     */
    private name: string | undefined;
    private language: string | undefined;
    private text: string | undefined;
    private example: object | undefined;

    /**
     * Setters de message
     */
    public setTo(to: string){
        this.to = to;
    }
    public setMessageType(messageType: string){
        this.messageType = messageType;
    }
    public setTemplate(template: string){
        this.template = template;
    }
    public setParams(params: object){
        this.params = params;
    }

    /**
     * Setters de template
     */
    
    public setName(name: string){
        this.name = name;
    }
    
    public setLanguage(language: string){
        this.language = language;
    }
    
    public setText(text: string){
        this.text = text;
    }
    
    public setExample(example: object){
        this.example = example;
    }

    constructor() {
    }

    /**
     * Método para crear los templates para envío de mensajes
     * @param name string Name of the template 
     * @param language string es es_LA es_ES en_US
     */
    public createTemplate() {
        const component = [
            {
                "type": "BODY",
                "text": this.text,
                "example": {
                    "body_text": [
                        this.example
                    ]
                }
            },
            {
                "type": "buttons",
                "buttons": [
                    {
                        "type": "PHONE_NUMBER",
                        "text": "Boton1",
                        "phone_number": "15550051310"
                    }
                ]
            }
        ];

        const body = {
            "name": this.name,
            "category": "MARKETING", //Opciones:AUTHENTICATION MARKETING UTILITY
            "allow_category_change": true,
            "language": this.language,
            "components": component
        };
        this.url += `${this.idAccount}/`;
        return this.sendRequest('message_templates', 'POST', body);
    }

    /**
     * getTemplates
     */
    public getTemplates() {
        this.url += `${this.idAccount}/`;

        return this.sendRequest('message_templates?fields=name,status&limit=3', 'GET');
    }

    public sendTemplateMessage() {    

        const data = {
            "messaging_product": "whatsapp",
            "to": this.to,
            "type": this.messageType,
            "template": { 
                "name": this.template,
                "language": {
                    "code": this.language
                },
                "components": [
                {
                    "type": "body",
                    "parameters": this.params
                }]
            }
        };
        this.url += `${this.idNumber}/`;

        return this.sendRequest('messages','POST', data);
    }

    public sendPersonalizedMessage() {    

        const data = {
            "messaging_product": "whatsapp",
            "to": this.to,
            "type": this.messageType,
            "text": {
                "body": this.text
            }
        };

        this.url += `${this.idNumber}/`;

        return this.sendRequest('messages', 'POST',data);
    }

    /**
     * Método que se encarga de ejecutar todas las peticiones a la API
     * @param endpoint string
     * @param method POST GET
     * @param data Contiene el body de la petición
     * @returns string
     */
    private async sendRequest(endpoint: string, method: string = 'POST', data?: object) {
        this.url += endpoint;

        const headers = {
            'Authorization': 'Bearer '+this.token,
           "Content-Type": "application/json"
        };  

        const request = {
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        };

        const res = await fetch(this.url, request)
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;    
        });

        return res;
    }
}

export { Whatsapp };