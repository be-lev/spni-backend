const dal = require("../data-access-layer/dal")

async function getHikingSitesAsync () {
    const sql = `SELECT siteId, name, description, adultEntryPrice, kidsEntryPrice, h.location 
    FROM israelhikingsites as I 
    JOIN hikingsitesareas as H 
    ON I.locationId= H.locationId`

    const sites = await dal.executeAsync(sql);
    return sites
}

async function addSiteAsync ( site) {   
    const sql = `INSERT INTO israelhikingsites VALUES(
        DEFAULT,
        '${site.name}',
        '${site.description}',
        '${site.locationId}',
        '${site.adultEntryPrice}',
        '${site.kidsEntryPrice}')`; 
    const info = await dal.executeAsync(sql);
    site.siteId = info.insertId;

    site.location = await getLocationName(site.locationId)
    return site
} 

async function getLocationName(locationId){
    const sql = `SELECT location FROM hikingsitesareas WHERE locationId = ${locationId}`;
    const locations = await dal.executeAsync(sql);
    return locations[0].location
}

async function getAllLocationsAsync(){
    const sql = 'SELECT * FROM hikingsitesareas'
    const locations = await dal.executeAsync(sql);
    return locations
}

async function deleteSiteAsync(siteId){
    const sql = `DELETE FROM israelhikingsites WHERE siteId = ${siteId}`
    await dal.executeAsync(sql)
}

async function getSitesByLocationNameAsync(locationName){
    const sql=`SELECT siteId, name, description, adultEntryPrice, kidsEntryPrice, h.location 
    FROM israelhikingsites as I 
    JOIN hikingsitesareas as H 
    ON I.locationId= H.locationId
    WHERE H.location='${locationName}'`
    const sitesByLocationName = await dal.executeAsync(sql);
    return sitesByLocationName
}

module.exports ={
    getAllLocationsAsync,
    addSiteAsync,
    getHikingSitesAsync,
    deleteSiteAsync,
    getSitesByLocationNameAsync
}