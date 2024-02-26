

export interface Product {
    sold:                number;
    images:              string[];
    subcategory:         Category[];
    ratingsQuantity:     number;
    _id:                 string;
    title:               string;
    slug:                string;
    description:         string;
    quantity:            number;
    price:               number;
    imageCover:          string;
    category:            Category;
    brand:               Category;
    ratingsAverage:      number;
    createdAt:           Date;
    updatedAt:           Date;
    id:                  string;
    priceAfterDiscount?: number;
    availableColors?:    any[];
}

export interface Category {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: Category;
}



export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
    nextPage:      number;
}


export interface ProductDetails {
    sold:            number;
    images:          string[];
    subcategory:     Category[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    slug:            string;
    description:     string;
    quantity:        number;
    price:           number;
    imageCover:      string;
    category:        Category;
    brand:           Category;
    ratingsAverage:  number;
    createdAt:       Date;
    updatedAt:       Date;
    __v:             number;
    reviews:         any[];
    id:              string;
}



