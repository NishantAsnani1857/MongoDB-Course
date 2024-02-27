const Router = require('express').Router;
const data = require('../model/productSchema')
const router = Router();




// const products = [
//   {
//     _id: 'fasdlk1j',
//     name: 'Stylish Backpack',
//     description:
//       'A stylish backpack for the modern women or men. It easily fits all your stuff.',
//     price: 79.99,
//     image: 'http://localhost:3100/images/product-backpack.jpg'
//   },
//   {
//     _id: 'asdgfs1',
//     name: 'Lovely Earrings',
//     description:
//       "How could a man resist these lovely earrings? Right - he couldn't.",
//     price: 129.59,
//     image: ' '
//   },
//   {
//     _id: 'askjll13',
//     name: 'Working MacBook',
//     description:
//       'Yes, you got that right - this MacBook has the old, working keyboard. Time to get it!',
//     price: 1799,
//     image: 'http://localhost:3100/images/product-macbook.jpg'
//   },
//   {
//     _id: 'sfhjk1lj21',
//     name: 'Red Purse',
//     description: 'A red purse. What is special about? It is red!',
//     price: 159.89,
//     image: 'http://localhost:3100/images/product-purse.jpg'
//   },
//   {
//     _id: 'lkljlkk11',
//     name: 'A T-Shirt',
//     description:
//       'Never be naked again! This T-Shirt can soon be yours. If you find that buy button.',
//     price: 39.99,
//     image: 'http://localhost:3100/images/product-shirt.jpg'
//   },
//   {
//     _id: 'sajlfjal11',
//     name: 'Cheap Watch',
//     description: 'It actually is not cheap. But a watch!',
//     price: 299.99,
//     image: 'http://localhost:3100/images/product-watch.jpg'
//   }
// ];

// Get list of products products
router.get('/', async (req, res, next) => {
  // Return a list of dummy products
  // Later, this data will be fetched from MongoDB
  const queryPage = parseInt(req.query.page);
  const pageSize = 1
  let products = []

  const result = await data.find({}).sort({ price: -1 })


    // skip((queryPage - 1)  * pageSize).limit(pageSize) for pagination
    .then((result) => {
      result.forEach(prodDoc => {
        products.push(prodDoc)
      })
      res.status(201).json(products)
    })
    .catch((err) => {
      console.log(`Error displaying data ${err}`);
      res.status(500).json({ Message: `${err}` })
    })
});

// Get single product
router.get('/:id', async (req, res, next) => {

  const id = req.params.id;
  const result = await data.findById(id)
    .then((result) => {
      console.log(`Product has been found ${result}`);
      res.status(201).json(result)
    })
    .catch((err) => {
      console.log(`Oh no we have encountered an error ${err}`);
      res.status(500).json({ Message: err })
    })




  // const product = products.find(p => p._id === req.params.id);
  // res.json(product);
});

// Add new product
// Requires logged in user
router.post('', async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: (req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image

  };
  const Data = new data(newProduct)
  await Data.save()
    .then((result) => {
      console.log(`Product added into the database ${result}`);
      res.status(201).json({ result })
    })
    .catch((err) => {
      console.log(`Oh no some error occured ${err}`);
      res.status(500).json({ Message: `${err}` })
    })

});

// Edit existing product
// Requires logged in user
router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price, // store this as 128bit decimal in MongoDB
    image: req.body.image
  };
  const options = { new: true };
  const result = await data.findByIdAndUpdate(id, updatedProduct, options)
    .then((result) => {
      console.log(`Product has been updated ${result}`);
      res.status(201).json(result)
    })
    .catch((err) => {
      console.log(`Oh no we have encountered an error ${err}`);
      res.status(500).json({ Message: err })
    })

  // const updatedProduct = {
  //   name: req.body.name,
  //   description: req.body.description,
  //   price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
  //   image: req.body.image
  // };
  // console.log(updatedProduct);
  // res.status(200).json({ message: 'Product updated', productId: 'DUMMY' });
});

// Delete a product
// Requires logged in user
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  const result = await data.findByIdAndDelete(id)
    .then((result) => {
      console.log(`Product has been Deleted`);
      res.status(201).json(result)
    })
    .catch((err) => {
      console.log(`Oh no we have encountered an error ${err}`);
      res.status(500).json({ Message: err })
    })

  // res.status(200).json({ message: 'Product deleted' });
});

module.exports = router;
