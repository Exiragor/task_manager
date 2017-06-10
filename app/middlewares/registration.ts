export let registration = function (fields: IFields) {
    let mark = true;

    for (let index in fields) {
        if (fields[index] == null || fields[index] == undefined || fields[index] == '')
            mark = false;
    }

    return mark;
};

interface IFields {
    name: string,
    last_name: string,
    email: string,
    password: string
}