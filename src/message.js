export class Message {
    static create(message){
       return fetch ('https://yehor-kyslynskyi-cv-default-rtdb.europe-west1.firebasedatabase.app/message.json', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            message.id = response.name
            return message
        })
    }
}
