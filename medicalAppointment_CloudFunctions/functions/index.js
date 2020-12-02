const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const app = express();

app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

//https://us-central1-medicalappointment-app-22829.cloudfunctions.net/api/createAppointment
app.post('/createAppointment', async (req, res) => {
    try {
        await db.collection('appointment').add({
            ident: req.body.ident,
            name: req.body.name,
            lastName: req.body.lastName,
            birthdate: req.body.birthdate,
            city: req.body.city,
            neighborhood: req.body.neighborhood,
            cellPhone: req.body.cellPhone
        });
        res.json({ response: "Cita asignada correctamente" });
    } catch (error) {
        res.json({ response: error });
    }
});

//https://us-central1-medicalappointment-app-22829.cloudfunctions.net/api/listAppoitment
app.get('/listAppoitment', async (req, res) => {
    try {
        let assignation = [];
        let allAppointment = await db.collection('appointment').get();
        for (const doc of allAppointment.docs) {
            let assignationToAdd = {
                id: doc.id,
                ident: doc.data().ident,
                name: doc.data().name,
                lastName: doc.data().lastName,
                birthdate: doc.data().birthdate,
                city: doc.data().city,
                neighborhood: doc.data().neighborhood,
                cellPhone: doc.data().cellPhone
            }
            assignation.push(assignationToAdd);
        }
        res.json({appointment: assignation});
    } catch (error) {
        res.json({ response: error });
    }
});

//https://us-central1-medicalappointment-app-22829.cloudfunctions.net/api/updateAppointment
app.put('/updateAppointment', async (req,res)=>{
    try{
        const {id, ident, name, lastName, birthdate, city, neighborhood, cellPhone} = req.body;
        let assignation = await db.collection('appointment').doc(id).set({
            ident: ident,
            name: name,
            lastName: lastName,
            birthdate: birthdate,
            city: city,
            neighborhood: neighborhood,
            cellPhone: cellPhone
        });
        res.json({ response: "Cita modificada correctamente" });
    }catch(error){
        res.json({ response: error });
    }
});

//https://us-central1-medicalappointment-app-22829.cloudfunctions.net/api/deleteAppointment
app.delete('/deleteAppointment', async (req,res)=>{
    try {
        const id = req.body.id;
        let deleteAssignation = await db.collection('appointment').doc(id).delete();
        res.json({response: "Cita eliminada correctamente"});
    } catch (error) {
        res.json({ response: error });
    }
});

exports.api = functions.https.onRequest(app);