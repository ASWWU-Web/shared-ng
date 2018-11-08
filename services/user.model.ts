export class User {
    wwuid: string;
    username: string;
    full_name: string;
    status: string;
    roles: string;

    constructor(data: any) {
        if (typeof data == "string") data = JSON.parse(data);
        for (var key in data) this[key] = data[key];
    }
}
