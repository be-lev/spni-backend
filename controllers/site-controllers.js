const express = require("express");
const router = express.Router();
const sitesLogic = require("../business-logic-layer/spni-logic-layer");

router.get("/", async (request, response) => {
  try {
    const sites = await sitesLogic.getHikingSitesAsync();
    response.json(sites);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const site = request.body;
    const addedSite = await sitesLogic.addSiteAsync(site);
    response.status(201).send(addedSite);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/locations", async(request,response)=>{
    try{
       const locations = await sitesLogic.getAllLocationsAsync();
       response.json(locations) 
    }catch(err){
        response.status(500).send(err.message);
    }
});

router.delete("/:id", async(request,response)=>{
    try{
const id = +request.params.id;
await sitesLogic.deleteSiteAsync(id)
response.sendStatus(204)
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

router.get("/sites-by-location/:locationName",  async(request,response)=>{
    try{  
        const locationName= request.params.locationName
       
        const ProductsByLocationName = await sitesLogic.getSitesByLocationNameAsync(locationName);
        if(!ProductsByLocationName) {
            response.status(404).send(`Category ${locationName} not found.`);
            return;
        }
        response.json(ProductsByLocationName) 
    }catch(err){
        response.status(500).send(err.message);
    }
})

module.exports = router;