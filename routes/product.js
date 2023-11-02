const express = require("express");
const productRouter = express.Router();
const auth = require("../middlewares/auth");
const {Product} = require("../models/product");


// api/products?category=Essentials
//api/amazon?theme=dark

// api/products:category=Essentials  then we will use =>
// console(req.params.category)
productRouter.get("/api/products", auth, async (req, res) => {
    try {
       // console.log(req.query.category)
        const products = await Product.find({
            category : req.query.category
 });
        res.json(products);
    } catch (e) {
        res.status(500).json({error : e.message});
    }
});

productRouter.get("/api/all-products", auth, async (req, res) => {
    try {
       // console.log(req.query.category)
        const products = await Product.find({
           // category : req.query.category
 });
        res.json(products);
    } catch (e) {
        res.status(500).json({error : e.message});
    }
});

// create a get request to search products
// / api/products/search/i

productRouter.get("/api/products/search/:name", auth, async (req, res) => {
    try {
     //   console.log(req.params.name)
        const products = await Product.find({
           name :
           // for if we search i full iphone will show up
            { $regex : req.params.name, 
               // option : "i", 
            }
        }); 
        res.json(products);
    } catch (e) {
        res.status(500).json({error : e.message});
    }
});

  // creating a post request route to rate the product

  productRouter.post("/api/rate-product", auth ,async(req, res) =>{
    try {
       const {id, rating } = req.body; // this id is product id
       let product = await Product.findById(id);

       /**
        * user id : "aaaa"
        * rating : 2.5
        * user id : "baaaa"
        * rating : 4,
        * now we have loop through each 
        */
       for(let i=0; i<product.ratings.length; i++){
        if(product.ratings[i].userId == req.user)// this rating means entire with user id and rating
        {
            product.ratings.splice(i, 1);
            break;
             } 
            } // this logic enable replace rating when user update it.
            const ratingSchema = {
                userId : req.user,
                rating: rating,
            }
            product.ratings.push(ratingSchema);
            product = await product.save();
            res.json(product);
    } catch (e) {
        res.status(500).json({error : e.message});
      //  console.log(e);
    }
  });

  // deal of the day = highest rated product
// auth is middleware
//   productRouter.get("/api/deal-of-day", auth, async( req, res) => {
//     try {
//         let products = await Product.find({});
//         // these a and b are two nos. ex product 1 ,product 2
//       products =  products.sort((a,b) => {
//             let aSum = 0;
//             let bSum = 0;

//             for(let i=0; i<a.ratings.length; i++){
//                 aSum += a.ratings[i].rating;
//             }
//             for(let i=0; i<b.ratings.length; i++){
//                 bSum += a.ratings[i].rating;
//             }
//             return aSum < bSum ? 1 : -1;

            
//         });
//         res.json(products[0]);
//     } catch (e) {
//         res.status(500).json({error : e.message});
//     }
//   } );

productRouter.get("/api/deal-of-day", auth, async (req, res) => {
    try {
      let products = await Product.find({});
  
      products = products.sort((a, b) => {
        let aSum = 0;
        let bSum = 0;
  
        for (let i = 0; i < a.ratings.length; i++) {
          aSum += a.ratings[i].rating;
        }
  
        for (let i = 0; i < b.ratings.length; i++) {
          bSum += b.ratings[i].rating;
        }
        return aSum < bSum ? 1 : -1;
      });
  
      res.json(products[0]);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
module.exports = productRouter;