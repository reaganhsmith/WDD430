export class Document {
    public id: string;
    public name: string;
    public description: string;
    public url: string;


    constructor(id: string, name: string, description: string, url: string, public children?: Document[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        
    }
}