# SMART-SHOP PRODUCTS API DOCUMENTATION WITH PISMA
![A cover photo](./assets/banner1.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents** 

- [API DOCUMENTATION GENERAL USAGE](#api-documentation-general-usage)
  - [BASE URL](#base-url)
  - [BASIC END POINTS](#basic-end-points)
    - [GET ALL PRODUCTS](#get-all-products)
      - [Status 200 OK](#status-200-ok)
      - [Status 404 Not Found](#status-404-not-found)
      - [Status 500 Internal Server Error](#status-500-internal-server-error)
    - [GET SPECIFIC PRODUCTS BY ID](#get-specific-products-by-id)
      - [Status 200 OK](#status-200-ok-1)
      - [Status 404 Not Found](#status-404-not-found-1)
      - [Status 500 Internal Server Error](#status-500-internal-server-error-1)
    - [ADD NEW PRODUCT TO THE DATABASE](#add-new-product-to-the-database)
      - [Status 201 Created/ product Added](#status-201-created-product-added)
      - [Status 500 Internal Server Error](#status-500-internal-server-error-2)
    - [UPDATE SPECIFIC PRODUCTS DETAILS BY ID](#update-specific-products-details-by-id)
      - [Status 200 OK](#status-200-ok-2)
      - [Status 404 Not found](#status-404-not-found)
      - [Status 500 Internal Server Error](#status-500-internal-server-error-3)
    - [DELETE SPECIFIC PRODUCTS BY ID](#delete-specific-products-by-id)
      - [Status 200 OK](#status-200-ok-3)
      - [Status 404 NOT FOUND](#status-404-not-found)
      - [Status 500 Internal Server Error](#status-500-internal-server-error-4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# API DOCUMENTATION GENERAL USAGE

These documentation will help you interact with the REST API to read products, add products, remove products and update products from a postgreSQL database.
  

## BASE URL  
Below is the base url for the smart shop products api.

```
http://localhost:5000/api/products
```

## BASIC END POINTS  
Listed below are all end points to;
- Get All Products - retrieve a list of all products from the database.

- Get a Single Product - retrieve a single product from the database based on its id.

- Create a Product - create a new product and write it to the PostgreSQL database.

- Update a Products - update a product based on it's id.

- Delete a Product - delete a product based on it's id.

### GET ALL PRODUCTS    
To get a list of all products use the folowing:
1. URL-"/" e.g.
```http://localhost:5000/api/products/```
1. Method-"GET"  

#### Status 200 OK
<hr/>

When the response has a status of ***200*** meaning the  response was okay and successful, data will be sent in the following format;
<br/>

```JSON
{
    "success": true,
    "data": {
        "command": "SELECT",
        "rowCount": 301, //based on number of products in the database
        "oid": null,
        "rows": [
            {
                "productid": "1",
                "productthumbnail": "http://dummyimage.com/240x100.png/cc0000/ffffff",
                "producttitle": "Coconut - Shredded, Unsweet",
                "productdescription": "sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus",
                "productcost": "$3.17",
                "onoffer": "true"
            },
            ...
        ],
        ...
    }
}
```


#### Status 404 Not Found
<hr/>

When the response has a status of ***404*** meaning that _no products have been found_, the following response will be sent;
<br/>

```JSON
{
  "success": false,
  "data": "Products not found"
}

```
#### Status 500 Internal Server Error
<hr/>
When there's a problem with the server and the server is not able to get data from the database, an error message will be sent with a status code of 500 attached to it.
<br/>

```JSON
{
  "success": false,
  "data": "A problem occurred with the server"
}

```

### GET SPECIFIC PRODUCTS BY ID    
To retrieve a single product from the database based on its id.
1. URL-"/:id" e.g.
```http://localhost:5000/api/products/1```
1. Method-"GET"    

#### Status 200 OK
<hr/>

```JSON
{
    "success": true,
    "data": {
        "command": "SELECT",
        "rowCount": 1, //retrieves one product based on the id query
        "oid": null,
        "rows": [
            {
                "productid": "1",
                "productthumbnail": "http://dummyimage.com/240x100.png/cc0000/ffffff",
                "producttitle": "Coconut - Shredded, Unsweet",
                "productdescription": "sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus",
                "productcost": "$3.17",
                "onoffer": "true"
            },
            ...
        ],
        ...
    }
}
```

#### Status 404 Not Found
<hr/>

When the response has a status of ***404*** meaning that _no product by that id has been found_, the following response will be sent;
<br/>

```JSON
{
  "success": false,
  "data": "Product not found"
}

```
#### Status 500 Internal Server Error
<hr/>

When there's a problem with the server and the server is not able to get data from the database, an error message will be sent with a status code of 500 attached to it.
<br/>

```JSON
{
  "success": false,
  "data": "A problem occurred with the server"
}

```

### ADD NEW PRODUCT TO THE DATABASE  
To add a product to the database.
1. URL-"/" e.g.
```http://localhost:5000/api/products/``` 
1. Method-"POST"   
1. Content-Type: 'application/json'

The body request sent in JSON format;
```JSON
  {
    "productThumbnail": "http://dummyimage.com/184x100.png/ff4444/ffffff",
    "productTitle": "Soup - Campbells Tomato Ravioli",
    "productDescription": "integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem",
    "productCost": "$5.74",
    "onOffer": "false"
    }
```

#### Status 201 Created/ product Added
<hr/>

Once a product has been successfully added, the following response will be sent;

```JSON
{
  "success": true,
  "data": "`You have successfully added product-name`"
}

```


#### Status 500 Internal Server Error
<hr/>
When there's a problem with the server and the server is not able to get data from the database, an error message will be sent with a status code of 500 attached to it.
<br/>

```JSON
{
  "success": false,
  "data": "A problem occurred with the server"
}

```


### UPDATE SPECIFIC PRODUCTS DETAILS BY ID    
To update details for a single product by id.  
Here we use PATCH method to enable user do selective update.
1. URL-"/:id" e.g.
```http://localhost:5000/api/products/550e8400-e29b-41d4-a716-446655440000```
1. Method-"PATCH"    


```JSON
  {
    "productThumbnail": "http://dummyimage.com/184x100.png/ff4444/ffffff",
    "productTitle": "Soup - Campbells Tomato Ravioli",
    "productDescription": "integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem",
    "productCost": "$5.74",
    "onOffer": "false"
    }
```

#### Status 200 OK
<hr/>

```JSON
{
  "success": true,
  "data": "Product updated successfully"
}

```
#### Status 404 Not found
<hr/>

```JSON
{
  "success": false,
  "data": "No product found"
}

```


#### Status 500 Internal Server Error
<hr/>

When there's a problem with the server and the server is not able to get data from the database, an error message will be sent with a status code of 500 attached to it.
<br/>

```JSON
{
  "success": false,
  "data": "A problem occurred with the server"
}

```

### DELETE SPECIFIC PRODUCTS BY ID  
To delete a single product based on it's id
1. URL-"/:id" e.g.
```http://localhost:5000/api/products/550e8400-e29b-41d4-a716-446655440000```
1. Method-"DELETE"  

#### Status 200 OK
<hr/>

```JSON
{
  "success": true,
  "data": "product has been successfully removed"
}

```
#### Status 404 NOT FOUND
<hr/>

```JSON
{
  "success": false,
  "data": "Product not found"
}

```

#### Status 500 Internal Server Error
<hr/>
When there's a problem with the server and the server is not able to get data from the database, an error message will be sent with a status code of 500 attached to it.
<br/>

```JSON
{
  "success": false,
  "data": "A problem occurred with the server"
}

```