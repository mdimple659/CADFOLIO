export class Posts {
    id
    userId
    title
    completed
}

export class Users {
    id
    name
    username
    email
    address = new Address
    phone
    website
    company = new Company
}
export class Address {
    street
    suite
    city
    zipcode
    geo = new GEO
}
export class Company {
    name
    catchPhrase
    bs
}
export class GEO {
    lat
    lng
}