import { application, json } from "express";
import "dotenv/config";


class Whatsapp {
    /**
     * Atributos generales 
     */
    private version = 'v17.0';
    private token = process.env.WHATSAPP_TOKEN;
    private idAccount = process.env.WHATSAPP_ID_ACCOUNT;
    private idNumber = process.env.WHATSAPP_ID_NUMBER
    private url = `https://graph.facebook.com/${this.version}/`;

    /**
     * Atributos de message
     */
    private to = '573195701440';
    private template: string | undefined;

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
    public setTemplate(template: string){
        this.template = template;
    }
    public setTo(to: string){
        this.to = to;
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
            "type": "template",
            "template": { 
                "name": this.template,
                "language": {
                    "code": "en_US"
                }
            }
        };
        this.url += `${this.idNumber}/`;

        return this.sendRequest('messages','POST', data);
    }

    public sendPersonalizedMessage() {    

        const data = {
            "messaging_product": "whatsapp",
            "to": "573195701440",
            "type": "template",
            "template": {
              "name": "hello_world",
              "language": {
                "code": "en_US"
              }
            }
        };

        this.url += `${this.idNumber}/`;

        return this.sendRequest('message', 'POST',data);
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

        console.log(this.url);
        const res = await fetch(this.url, request)
        .then(response => response.text())
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