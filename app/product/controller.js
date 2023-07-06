import Products from "./model.js"
 
export const getProducts = async (req, res) => {
    
    try {
        const products = await Products.find();
        const hasil = products.map(elm => {
                if (elm) {
                    
                        if (elm.status === true) {
                            // console.log("status ready")
                            elm.status = "Ready"
                            return elm
                        }else{
                            elm.status = "Not Ready"
                            return elm
                        } 
                } 
                return elm
            })
            // console.log(hasil)
            // console.log("hasil")
        res.json(hasil);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getProductsById = async (req, res) => {
    try {
        const products = await Products.findById(req.params.id);
        res.json(products);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 
export const saveProducts = async (req, res) => {
    const products = new Products(req.body);
    try {
        const insertedProducts = await products.save();
        res.status(201).json(insertedProducts);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const updateProducts = async (req, res) => {
    try {
        const updatedProducts = await Products.updateOne({ _id: req.params.id }, { $set: req.body.data });
        res.status(200).json(updatedProducts);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const deleteProducts = async (req, res) => {
    try {
        const deletedproducts = await Products.deleteOne({_id:req.params.id});
        res.status(200).json(deletedproducts);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

