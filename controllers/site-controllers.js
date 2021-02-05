const express = require("express");
const router = express.Router();
const productsLogic = require("../business-logic-layer/spni-logic-layer");

router.get("/", async (request, response) => {
  try {
    const sites = await productsLogic.getHikingSitesAsync();
    response.json(sites);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const site = request.body;
    const addedSite = await productsLogic.addSiteAsync(site);
    response.status(201).send(addedSite);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/locations", async(request,response)=>{
    try{
       const locations = await productsLogic.getAllLocationsAsync();
       response.json(locations) 
    }catch(err){
        response.status(500).send(err.message);
    }
});

router.delete("/:id", async(request,response)=>{
    try{
const id = +request.params.id;
await productsLogic.deleteSiteAsync(id)
response.sendStatus(204)
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

module.exports = router;