import fire from '../conf/fire';
import axios from 'axios';
import config from '../conf/configuration';
import firebase from 'firebase/compat/app';

export async function getAllMessages() {
    const db = fire.firestore();
    const snapshot = await db.collection('contact').get();
    if (!snapshot.empty) {
        var messages = [];
        snapshot.forEach((doc) => {
            messages.push(doc.data());
        });
        return messages;
    } else {
        // if there is no documents return null
        return null;
    }
}

// Add new Contact us message
export function addContactMessage(email, name, message) {
    const db = fire.firestore();
    db.collection('contact').add({
        name: name,
        email: email,
        message: message,
        created_at: firebase.firestore.Timestamp.now(),
    });
}

// Edit Google track code. needs to bo with analytics
export function editTrackingCode(trackingCode) {
    const db = fire.firestore();
    db.collection('data').doc('meta').update({
        trackingCode: trackingCode,
    });
}

/// Add Resume
function addResume(userId) {
    localStorage.removeItem('currentResumeItem');
    const db = fire.firestore();
    db.collection('users')
        .doc(userId)
        .collection('resumes')
        .add({})
        .then((docRef) => {
            // Adding one into stats Resumes Created
            var statsRef = db.collection('data').doc('stats');
            statsRef.update({
                numberOfResumesCreated: firebase.firestore.FieldValue.increment(1),
            });
            setTimeout(() => {
                localStorage.setItem('currentResumeId', docRef.id);
            }, 400);
        })
        .then((error) => console.log(error));
}

/// Add Resume
export async function addCoverLetter(userId, values) {
    // check if we have currentCoverId in local storage
    // if we have we need to update the cover in firestore with that id
    // otherwise we need to create new cover

    if (localStorage.getItem('currentCoverId')) {
        const db = fire.firestore();
        await db
            .collection('users')
            .doc(userId)
            .collection('covers')
            .doc(localStorage.getItem('currentCoverId'))
            .update({ ...values, created_at: firebase.firestore.Timestamp.now() })
            .then((docRef) => {})
            .then((error) => console.log(error));
    } else {
        const db = fire.firestore();
        // add cover to firestore and set it to local storage as currentCoverId
        db.collection('users')
            .doc(userId)
            .collection('covers')
            .add({ ...values, created_at: firebase.firestore.Timestamp.now() })
            .then(async (docRef) => {
                // Adding one into stats Resumes Created

                await addOneToNumberOfDocumentsGenerated(userId);

                setTimeout(() => {
                    localStorage.setItem('currentCoverId', docRef.id);
                }, 400);
            });
    }
}

// handle removeCover function
export async function removeCover(userId, coverId) {
    // remove the cover from /users/{userId}/covers/{coverId}
    const db = fire.firestore();
    await db
        .collection('users')
        .doc(userId)
        .collection('covers')
        .doc(coverId)
        .delete()
        .then(async function () {
            // remove the cover from /users/{userId}/favourites/{coverId}
            await db
                .collection('users')
                .doc(userId)
                .collection('favourites')
                .doc(coverId)
                .delete()
                .then(function () {});
        });

    // return true
    return true;
}
// remove resume
export async function removeResumeCurrent(userId, resumeId) {
    // remove the resume from /users/{userId}/resumes/{resumeId}
    const db = fire.firestore();
    await db
        .collection('users')
        .doc(userId)
        .collection('resumes')
        .doc(resumeId)
        .delete()
        .then(async function () {
            // remove the resume from /users/{userId}/favourites/{resumeId}
            await db
                .collection('users')
                .doc(userId)
                .collection('favourites')
                .doc(resumeId)
                .delete()
                .then(function () {});
        });

    // return true
    return true;
}

export function removeResume(userId, resumeId) {
    const db = fire.firestore();
    // Decrement 1 from resumes
    var statsRef = db.collection('data').doc('stats');
    statsRef.update({
        numberOfResumesCreated: firebase.firestore.FieldValue.increment(-1),
    });
    db.collection('users')
        .doc(userId)
        .collection('resumes')
        .doc(resumeId)
        .delete()
        .then(function () {})
        .catch(function (error) {
            console.error('Error removing document: ', error);
        });
}

// Add sbs
export async function addSbs(type, paimentType, currentDate, price,uid) {
  var uidOriginal = fire.auth().currentUser.uid;
    const db = fire.firestore();
    var sbsEnd = null;
    var date = new Date(currentDate);

    if (type === 'monthly') {
        sbsEnd = new Date(date.setMonth(date.getMonth() + 1));
    }
    if (type === 'halfYear') {
        sbsEnd = new Date(date.setMonth(date.getMonth() + 6));
    }
    if (type === 'yearly') {
        sbsEnd = new Date(date.setMonth(date.getMonth() + 12));
    }

    db.collection('subscriptions').add({
        userId: uid,
        type: type,
        sbsEnd: sbsEnd,
        paimentType: paimentType,
        created_at: firebase.firestore.Timestamp.now(),
    });

    db.collection('users').doc(uidOriginal).update({
        membership: 'Premium',
        membershipEnds: sbsEnd,
    });

    const snapshot = await db.collection('data').doc('earnings').get();
    if (snapshot.exists) {
        db.collection('data')
            .doc('earnings')
            .update({
                amount: firebase.firestore.FieldValue.increment(parseInt(price)),
            });
    } else {
        db.collection('data')
            .doc('earnings')
            .set({
                amount: parseInt(price),
            });
    }
}
// Check Sbs Date
export async function checkSbs(accountType, expDate) {
    const res = await axios.post(config.provider+'://' + config.backendUrl + '/api/check', {
        accountType: accountType,
        expDate: expDate,
    });
    var status = res.data['status'];
    return status;
}
// Check Sbs Date
export async function makeBasicAccount(userId) {
    const db = fire.firestore();
    await db
        .collection('users')
        .doc(userId)
        .update({
            membershipEnds: new Date('2017-05-05'),
            membership: 'Basic',
        })
        .then((error) => console.log(error));
}

// Get 7 Users
export async function get7Users() {
    const db = fire.firestore();
    const snapshot = await db.collection('users').limit(6).get();
    if (!snapshot.empty) {
        var users = [];
        snapshot.forEach((doc) => users.push(doc.data()));
        console.log(users);
        return users;
    } else {
        console.log('makan walo');
        return null;
    }
}

// Get All Users
export async function getAllUsers() {
    const db = fire.firestore();
    const snapshot = await db.collection('users').get();
    if (!snapshot.empty) {
        var users = [];
        snapshot.forEach((doc) => users.push(doc.data()));
        return users;
    } else {
        console.log('makan walo');
        return null;
    }
}

// Get All Subscriptuins
export async function getAllSubscriptions() {
    const db = fire.firestore();
    const snapshot = await db.collection('subscriptions').orderBy('created_at', 'desc').limit(7).get();
    if (!snapshot.empty) {
        var subscriptions = [];
        snapshot.forEach((doc) => subscriptions.push(doc.data()));
        return subscriptions;
    } else {
        return null;
    }
}

// Get User by id
export async function getUserById(id) {
    const db = fire.firestore();
    console.log(id);
    var user = null;
    await db
        .collection('users')
        .where('email', '==', id)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.data());
                user = doc.data();
            });
        });

    if (user !== null) {
        return user;
    } else {
        return false;
    }

    // console.log(snapshot);

    // if (snapshot.exists) {
    //   console.log(snapshot.data());
    //   return snapshot.data()
    // } else {
    //   console.log("not foiund");

    //   return false
    // }
}
// Adding user to firstore
export function addUser(userId, firstname, lastname, email) {
    const db = fire.firestore();
    db.collection('users')
        .doc(userId)
        .set({
            userId: userId,
            firstname: firstname,
            lastname: lastname,
            resumes: '',
            membership: 'Basic',
            email: email,
            membershipEnds: new Date('2017-05-05'),
        })
        .then((error) => console.log(error));

    var statsRef = db.collection('data').doc('stats');
    statsRef.update({
        numberOfUsers: firebase.firestore.FieldValue.increment(1),
    });
}
// Adding user to firstore
export function editUser(userId, email, membership, membershipsEnds) {
    // const db = fire.firestore();
    // db.collection('users')
    //     .doc(userId)
    //     .set({
    //         userId: userId,
    //         membership: membership,
    //         email: email,
    //         membershipEnds: new Date(membershipsEnds),
    //     })
    //     .then((error) => console.log(error));

    // update the user with this data

    const db = fire.firestore();
    db.collection('users')
        .doc(userId)
        .update({
            membership: membership,
            email: email,
            membershipEnds: new Date(membershipsEnds),
        })
        .then((error) => console.log(error));

    // change the email in auth
    var user = fire.auth().currentUser;

    user.updateEmail(email)
        .then(function () {
            // Update successful.
        })
        .catch(function (error) {
            console.log(error);
        });
}

// edit user personal info
export function editPersonalInfo(userId, firstname, lastname) {
    const db = fire.firestore();

    db.collection('users')
        .doc(userId)
        .update({
            firstname: firstname,
            lastname: lastname,
        })
        .then((error) => console.log(error));
}

// ADD 1 to downloads
export async function IncrementDownloads() {
    const db = fire.firestore();
    var statsRef = db.collection('data').doc('stats');
    await statsRef.update({
        numberOfResumesDownloaded: firebase.firestore.FieldValue.increment(1),
    });
}
// ADD 1 to users
export async function IncrementUsers(userid) {
    console.log('in incrementing function  ' + userid);

    const db = fire.firestore();
    const userRef = db.collection('users').doc(userid);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        console.log('iNCREMENTING ONE ' + userid);
        var statsRef = db.collection('data').doc('stats');
        statsRef.update({
            numberOfUsers: firebase.firestore.FieldValue.increment(1),
        });
    }
}
// Getting the name of the current user
export async function getFullName(userId) {
    var firstname = '';
    var lastname = '';
    var membership = ';';
    var profile = '';
    const db = fire.firestore();
    const userRef = db.collection('users').doc(userId);
    const snapshot = await userRef.get();
    if (snapshot.exists) {
        firstname = snapshot.data().firstname;
        lastname = snapshot.data().lastname;
        membership = snapshot.data().membership;
        profile = snapshot.data().profile;
        return { firstname, lastname, membership, profile };
    } else {
        console.log('notfound');
    }
}

// get website meta data if not founf create it
export async function getWebsiteData() {
    const db = fire.firestore();
    const userRef = db.collection('data').doc('meta');
    const snapshot = await userRef.get();
    if (snapshot.exists) {
        var data = snapshot.data();

        return data;
    } else {
        /// If meta data not in database create generic one
        const userRef = db.collection('data').doc('meta');
        userRef.set({
            title: 'Title here',
            description: 'description here',
            keywords: 'keywords here',
            rating:5
        });
        console.log('notfound');
    }
}
// Set Website Data

export function settWebsiteData(title, description, keywords, language) {
    const db = fire.firestore();
    const userRef = db.collection('data').doc('meta');
    userRef.set({
        title: title,
        description: description,
        keywords: keywords,
        language: language,
    });
}

// Set Subscriptions Data

export function setSubscriptionsData(state, month, quartarly, yearly, onlyPP,onlyCinet,currency) {
    const db = fire.firestore();
    const userRef = db.collection('data').doc('subscriptions');
    userRef.set({
        state: state,
        monthlyPrice: month,
        quartarlyPrice: quartarly,
        yearlyPrice: yearly,
        onlyPP: onlyPP,
        onlyCinet:onlyCinet,
        currency: currency,
    });
}

// get Subscription data
export async function getSubscriptionStatus() {
    const db = fire.firestore();
    const userRef = db.collection('data').doc('subscriptions');
    const snapshot = await userRef.get();
    if (snapshot.exists) {
        var data = snapshot.data();
        return data;
    } else {
        /// If meta data not in database create generic one
        const userRef = db.collection('data').doc('subscriptions');
        userRef.set({
            state: false,
            monthlyPrice: 30,
            quartarlyPrice: 60,
            yearlyPrice: 120,
        });
        /// return something after we add  if do not it will not find any thing in first  render
        return {
            state: false,
            monthlyPrice: 30,
            quartarlyPrice: 60,
            yearlyPrice: 120,
        };
    }
}

// Change password
export async function changePassword(password) {
    var user = fire.auth().currentUser;
    user.updatePassword(password)
        .then(function () {})
        .catch(function (error) {
            // An error happened.
            console.log(error);
        });
}
export async function getStats() {
    var stats;
    const db = fire.firestore();
    const statsRef = db.collection('data').doc('stats');
    const snapshot = await statsRef.get();
    if (snapshot.exists) {
        stats = snapshot.data();
        return stats;
    }
}
// Get ads
export async function getAds() {
    const db = fire.firestore();
    const adsRef = db.collection('ads');
    var allDocs = [];
    const snapshot = await adsRef.get().then((snapshot) => {
        snapshot.forEach((item) => {
            allDocs.push(item.data());
        });
    });
    if (allDocs.length > 0) {
        return allDocs;
    } else {
        return null;
    }
}

//  add Ads
export async function addAds(link, name, destinationLink) {
    var id = makeid(5);
    const db = fire.firestore();
    const adsRef = db.collection('ads');
    //  Getting the date
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
        await adsRef
            .doc(id)
            .set({
                id: id,
                name: name,
                imageLink: link,
                date: `${day}-0${month}-${year}`,
                destinationLink: destinationLink,
            })
            .then((value) => {
                return true;
            });
    } else {
        await adsRef
            .doc(id)
            .set({
                id: id,
                name: name,
                imageLink: link,
                date: `${day}-${month}-${year}`,
                destinationLink: destinationLink,
            })
            .then((value) => {
                return true;
            });
    }
}
// Get pages
export async function getPages() {
    const db = fire.firestore();
    const adsRef = db.collection('pages');
    var allDocs = [];
    const snapshot = await adsRef.get().then((snapshot) => {
        snapshot.forEach((item) => {
            allDocs.push(item.data());
        });
    });
    if (allDocs.length > 0) {
        return allDocs;
    } else {
        return null;
    }
}

// Get  page by name
export async function getPageByName(name) {
    const db = fire.firestore();
    const snapshot = await db.collection('pages').doc(name).get();
    if (snapshot.exists) {
        return snapshot.data();
    }
}

// Remove  page by name
export async function removePageByName(name) {
    const db = fire.firestore();
    await db
        .collection('pages')
        .doc(name)
        .delete()
        .then((value) => {
            console.log('Succefully delete');
            return true;
        });
}

// Add Pages

export async function addPages(pagename, pagecontent) {
    const db = fire.firestore();
    const adsRef = db.collection('pages');
    //  Getting the date
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
        await adsRef
            .doc(pagename)
            .set({ id: pagename, pagecontent: pagecontent, date: `${day}-0${month}-${year}` })
            .then((value) => {
                return true;
            });
    } else {
        await adsRef
            .doc(pagename)
            .set({ id: pagename, pagecontent: pagecontent, date: `${day}-${month}-${year}` })
            .then((value) => {
                return true;
            });
    }
}

export async function getEarnings() {
    const db = fire.firestore();
    const snapshot = await db.collection('data').doc('earnings').get();
    if (snapshot.exists) {
        return snapshot.data();
    } else {
        return null;
    }
}

// Remove add
export async function removeAd(id) {
    const db = fire.firestore();
    await db
        .collection('ads')
        .doc(id)
        .delete()
        .then((value) => {
            return true;
        });
}

// Get  website details
export async function getWebsiteDetails() {
    const db = fire.firestore();
    const snapshot = await db.collection('data').doc('details').get();
    if (snapshot.exists) {
        return snapshot.data();
    } else {
        return null;
    }
}

// Get  website details
export async function getSocialLinks() {
    const db = fire.firestore();
    const snapshot = await db.collection('data').doc('social').get();
    if (snapshot.exists) {
        return snapshot.data();
    } else {
        return null;
    }
}
export async function addSocial(facebook, twitter, instagram, youtube, pinterest) {
    const db = fire.firestore();
    db.collection('data')
        .doc('social')
        .set({
            facebook: facebook,
            twitter: twitter,
            instagram: instagram,
            youtube: youtube,
            pinterest: pinterest,
        })
        .then((value) => console.log('Succefully added Social Links'));
}

export async function addDetails(websitename, websitedescription) {
    const db = fire.firestore();
    db.collection('data')
        .doc('details')
        .set({
            websiteName: websitename,
            websitedescription: websitedescription,
        })
        .then((value) => console.log('Succefully added webiste details'));
}
export async function getResumes(userId) {
    var resume = {};
    var resumes = [];
    var i = 0;
    const db = fire.firestore();
    const userRef = db.collection('users').doc(userId).collection('resumes');
    const snapshot = await userRef.get();
    if (snapshot.empty) {
        return;
    }
    snapshot.forEach((doc) => {
        resume.id = doc.id; // this is resume Id
        resume.template = doc.data().template;
        resume.item = doc.data();
        resume.employments = [];
        resume.educations = [];
        resume.languages = [];
        resume.skills = [];
        resumes[i] = resume;
        resume = {};
        i++;
    });

    ////////////////////// After getting all resumes we loop throu each resume Id  and get the emploments
    var employmentIndex = 0; // this index will represent the index of each employment inside resumeObject
    for (let index = 0; index < resumes.length; index++) {
        const db = fire.firestore();
        const employmentRef = db.collection('users').doc(userId).collection('resumes').doc(resumes[index].id).collection('employments'); // Getting all employments inside the resume
        const employmentSnapshot = await employmentRef.get();
        if (!employmentSnapshot.empty) {
            // Looping throu resumes if found
            employmentSnapshot.forEach((value) => {
                // assigning data into our resumes[using the index of the target resume] array
                resumes[index].employments[employmentIndex] = value.data();
                resumes[index].employments[employmentIndex].employmentId = value.id;
                employmentIndex++;
            });
        }
    }
    ////////////////////// After getting all resumes we loop throu each resume Id  and get the eductions
    var educationIndex = 0; // this index will represent the index of each employment inside resumeObject
    for (let index = 0; index < resumes.length; index++) {
        const db = fire.firestore();
        const educationRef = db.collection('users').doc(userId).collection('resumes').doc(resumes[index].id).collection('educations'); // Getting all employments inside the resume
        const educationSnapshot = await educationRef.get();
        if (!educationSnapshot.empty) {
            // Looping throu resumes if found
            //   console.log("Found employments in"+ resumes[index].id);
            educationSnapshot.forEach((value) => {
                // assigning data into our resumes[using the index of the target resume] array
                resumes[index].educations[educationIndex] = value.data();
                resumes[index].educations[educationIndex].educationId = value.id;
                // console.log( "The id of the employment is"+ resumes[index].employments[employmentIndex].employmentId)
                educationIndex++;
            });
        }
    }
    ////////////////////// After getting all resumes we loop throu each resume Id  and get the eductions
    var skillIndex = 0; // this index will represent the index of each employment inside resumeObject
    for (let index = 0; index < resumes.length; index++) {
        const db = fire.firestore();
        const skillRef = db.collection('users').doc(userId).collection('resumes').doc(resumes[index].id).collection('skills'); // Getting all employments inside the resume
        const skillSnapshot = await skillRef.get();
        if (!skillSnapshot.empty) {
            // Looping throu resumes if found
            //   console.log("Found employments in"+ resumes[index].id);
            skillSnapshot.forEach((value) => {
                // assigning data into our resumes[using the index of the target resume] array
                resumes[index].skills[skillIndex] = value.data();
                resumes[index].skills[skillIndex].skillId = value.id;
                // console.log( "The id of the employment is"+ resumes[index].employments[employmentIndex].employmentId)
                skillIndex++;
            });
        }
    }
    ////////////////////// After getting all resumes we loop throu each resume Id  and get the eductions
    var languageIndex = 0; // this index will represent the index of each employment inside resumeObject
    for (let index = 0; index < resumes.length; index++) {
        const db = fire.firestore();
        const skillRef = db.collection('users').doc(userId).collection('resumes').doc(resumes[index].id).collection('languages'); // Getting all employments inside the resume
        const skillSnapshot = await skillRef.get();
        if (!skillSnapshot.empty) {
            // Looping throu resumes if found
            //   console.log("Found employments in"+ resumes[index].id);
            skillSnapshot.forEach((value) => {
                // assigning data into our resumes[using the index of the target resume] array
                resumes[index].languages[languageIndex] = value.data();
                resumes[index].languages[languageIndex].skillId = value.id;
                // console.log( "The id of the employment is"+ resumes[index].employments[employmentIndex].employmentId)
                languageIndex++;
            });
        }
    }
    //  console.log("Resumes final result ");
    //console.log(resumes);
    return resumes;
}

// function that id of a document to favourites collection of the user
// returns true if the document is added to favourites
export async function addToFavourites(userId, documentId) {
    const db = fire.firestore();
    db.collection('users')
        .doc(userId)
        .collection('favourites')
        .doc(documentId)
        .set({
            documentId: documentId,
        })
        .then((value) => console.log('Succefully added to favourites'));
    return true;
}

// function that check if a document is in favourites collection of the user
// if it is already in favourites remove it from favourites
// if it is not in favourites add it to favourites
export async function checkIfInFavourites(userId, documentId) {
    const db = fire.firestore();
    const docRef = db.collection('users').doc(userId).collection('favourites').doc(documentId);
    const doc = await docRef.get();
    if (!doc.exists) {
        await addToFavourites(userId, documentId);
        return true;
    } else {
        await removeFromFavourites(userId, documentId);
        return false;
    }
}

export async function removeFromFavourites(userId, documentId) {
    const db = fire.firestore();
    db.collection('users')
        .doc(userId)
        .collection('favourites')
        .doc(documentId)
        .delete()
        .then((value) => console.log('Succefully removed from favourites'));
    return true;
}

// get all favourites and set documentID in array
export async function getFavourites(userId) {
    const db = fire.firestore();
    const favouritesRef = db.collection('users').doc(userId).collection('favourites');
    const favouritesSnapshot = await favouritesRef.get();
    var favourites = [];
    if (!favouritesSnapshot.empty) {
        favouritesSnapshot.forEach((value) => {
            favourites.push(value.data().documentId);
        });
    }
    return favourites;
}

// get cover by id
export async function getCoverById(userId, coverId) {
    const db = fire.firestore();
    const coverRef = db.collection('users').doc(userId).collection('covers').doc(coverId);
    const coverSnapshot = await coverRef.get();
    var cover = coverSnapshot.data();
    cover.coverId = coverId;
    return cover;
}

//  get covers function same as get resumes
export async function getCovers(userId) {
    var cover = {};
    var covers = [];
    var i = 0;
    const db = fire.firestore();
    const userRef = db.collection('users').doc(userId).collection('covers').limit(3);
    const snapshot = await userRef.get();
    if (snapshot.empty) {
        return;
    }
    snapshot.forEach((doc) => {
        cover.id = doc.id; // this is resume Id
        cover.template = doc.data().template;
        cover.item = doc.data();
        cover.employments = [];
        cover.educations = [];
        cover.languages = [];
        cover.skills = [];
        covers[i] = cover;
        cover = {};
        i++;
    });

    // return
    return covers;
}

// adding employments
export async function addEmployments(userId, resumeId, employmentsToAdd) {
    // getting all employments ids first
    var employmentsIds = [];
    var employmentIndex = 0;
    const db = fire.firestore();
    const employmentRef = db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('employments'); // Getting all employments inside the resume
    const employmentSnapshot = await employmentRef.get();
    if (!employmentSnapshot.empty) {
        employmentSnapshot.forEach((value) => {
            employmentsIds[employmentIndex] = value.id;
            employmentIndex++;
        });
    }
    // Now we have the ids we can loop throu them and delete them to add new ones
    employmentsIds.forEach((value) => {
        db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('employments').doc(value).delete();
    });
    // Adding the new employments
    var res;
    for (let index = 0; index < employmentsToAdd.length; index++) {
        const employmentRef = db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('employments');
        employmentsToAdd[index] !== null
            ? (res = await employmentRef.add({
                  id: employmentsToAdd[index].id,
                  date: employmentsToAdd[index].date,
                  jobTitle: employmentsToAdd[index].jobTitle,
                  employer: employmentsToAdd[index].employer,
                  begin: employmentsToAdd[index].begin,
                  end: employmentsToAdd[index].end,
                  description: employmentsToAdd[index].description,
              }))
            : console.log('kk');
    }
}
// adding Educations
export async function addEducations(userId, resumeId, educatiionsToAdd) {
    // getting all employments ids first
    var educationsIds = [];
    var educationIndex = 0;
    const db = fire.firestore();
    const educationRef = db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('educations'); // Getting all employments inside the resume
    const educationSnapshot = await educationRef.get();
    if (!educationSnapshot.empty) {
        educationSnapshot.forEach((value) => {
            educationsIds[educationIndex] = value.id;
            educationIndex++;
        });
    }
    // Now we have the ids we can loop throu them and delete them to add new ones
    educationsIds.forEach((value) => {
        db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('educations').doc(value).delete();
    });
    // Adding the new employments
    var res;
    for (let index = 0; index < educatiionsToAdd.length; index++) {
        const educationRef = db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('educations');
        educatiionsToAdd[index] !== null
            ? (res = await educationRef.add({
                  id: educatiionsToAdd[index].id,
                  date: educatiionsToAdd[index].date,

                  school: educatiionsToAdd[index].school,
                  started: educatiionsToAdd[index].started,
                  finished: educatiionsToAdd[index].finished,
                  degree: educatiionsToAdd[index].degree,
                  description: educatiionsToAdd[index].description,
              }))
            : console.log();
    }
}
// adding Educations
export async function addSkills(userId, resumeId, skillsToAdd) {
    // getting all employments ids first
    var skillsIds = [];
    var skillIndex = 0;
    const db = fire.firestore();
    const skillRef = db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('skills'); // Getting all employments inside the resume
    const skillSnapshot = await skillRef.get();
    if (!skillSnapshot.empty) {
        skillSnapshot.forEach((value) => {
            skillsIds[skillIndex] = value.id;
            skillIndex++;
        });
    }

    // Now we have the ids we can loop throu them and delete them to add new ones
    skillsIds.forEach((value) => {
        db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('skills').doc(value).delete();
    });
    // Adding the new employments
    var res;
    for (let index = 0; index < skillsToAdd.length; index++) {
        const skillRef = db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('skills');
        res = await skillRef.add({
            id: skillsToAdd[index].id,
            date: skillsToAdd[index].date,
            name: skillsToAdd[index].name,
            rating: skillsToAdd[index].rating,
        });
    }
}
/// Add Languages

export async function addLanguages(userId, resumeId, languagesToAdd) {
    // getting all employments ids first
    var skillsIds = [];
    var skillIndex = 0;
    const db = fire.firestore();
    const skillRef = db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('languages'); // Getting all employments inside the resume
    const skillSnapshot = await skillRef.get();
    if (!skillSnapshot.empty) {
        skillSnapshot.forEach((value) => {
            skillsIds[skillIndex] = value.id;
            skillIndex++;
        });
    }

    // Now we have the ids we can loop throu them and delete them to add new ones
    skillsIds.forEach((value) => {
        db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('languages').doc(value).delete();
    });
    // Adding the new employments
    var res;
    for (let index = 0; index < languagesToAdd.length; index++) {
        const skillRef = db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('languages');
        res = await skillRef.add({
            id: languagesToAdd[index].id,
            name: languagesToAdd[index].name,
            date: languagesToAdd[index].date,
            level: languagesToAdd[index].level,
        });
    }
}

export async function InitialisationCheck() {
    const db = fire.firestore();
    const userRef = db.collection('data').doc('id');
    const snapshot = await userRef.get();
    if (snapshot.data() != undefined) {
        return snapshot.data().userId;
    } else {
        return undefined;
    }
}

export async function getResumeById(userId, resumeId) {
    const db = fire.firestore();
    var resume;
    var resumeRef = await db.collection('users').doc(userId).collection('resumes').doc(resumeId).get();
    if (resumeRef.exists) {
        resume = resumeRef.data();
    } else {
        return null;
    }

    var empRef = await db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('employments').get();
    if (!empRef.empty) {
        resume.employments = [];
        for (let index = 0; index < empRef.docs.length; index++) {
            resume.employments[index] = empRef.docs[index].data();
        }
    } else {
        resume.employments = [];
    }

    var skillsRef = await db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('skills').get();
    if (!skillsRef.empty) {
        resume.skills = [];
        for (let index = 0; index < skillsRef.docs.length; index++) {
            resume.skills[index] = skillsRef.docs[index].data();
        }
    } else {
        resume.skills = [];
    }

    var educationsRef = await db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('educations').get();
    if (!educationsRef.empty) {
        resume.educations = [];
        for (let index = 0; index < educationsRef.docs.length; index++) {
            resume.educations[index] = educationsRef.docs[index].data();
        }
    } else {
        resume.educations = [];
    }

    var languagesRef = await db.collection('users').doc(userId).collection('resumes').doc(resumeId).collection('languages').get();
    if (!languagesRef.empty) {
        resume.languages = [];
        for (let index = 0; index < languagesRef.docs.length; index++) {
            resume.languages[index] = languagesRef.docs[index].data();
        }
    } else {
        resume.languages = [];
    }
    return resume;
}

export async function getJsonById(resumeId) {
    const db = fire.firestore();
    const JsonSnapshot = await db.collection('pb').doc(resumeId).get();
    if (JsonSnapshot.exists) {
        return JSON.parse(JsonSnapshot.data().object);
    } else {
        return null;
    }
}

export async function setJsonPb(resumeId, resumeObject) {
    const db = fire.firestore();
    resumeObject.user = null;
    console.log(resumeObject);
    await db
        .collection('pb')
        .doc(resumeId)
        .set({
            id: resumeId,
            object: JSON.stringify(resumeObject),
        });
}

export async function checkIfResumeIdAvailable(userId) {
    const db = fire.firestore();
    if (localStorage.getItem('currentResumeId') === undefined) {
        await db
            .collection('users')
            .doc(userId)
            .collection('resumes')
            .add({})
            .then((resumeRef) => {
                localStorage.setItem('currentResumeId', resumeRef.id);
            });
    }
}
export async function setResumePropertyPerUser(userId, resumeId, propertyName, value) {
    if(userId === null)
    return 

    const db = fire.firestore();
    const user = db.collection('users').doc(userId).collection('resumes').doc(resumeId);
    var res;
    switch (propertyName) {
        case 'firstname':
            res = await user.set(
                {
                    firstname: value,
                },
                { merge: true }
            );
            break;
        case 'pbId':
            res = await user.set(
                {
                    pbId: value,
                },
                { merge: true }
            );
            break;

        case 'lastname':
            res = await user.set(
                {
                    lastname: value,
                },
                { merge: true }
            );
            break;
        case 'summary':
            res = await user.set(
                {
                    summary: value,
                },
                { merge: true }
            );
            break;
        case 'email':
            res = await user.set(
                {
                    email: value,
                },
                { merge: true }
            );
            break;
        case 'template':
            res = await user.set(
                {
                    template: value,

                    created_at: new Date(),
                },
                { merge: true }
            );
            break;
        case 'title':
            res = await user.set(
                {
                    title: value,
                },
                { merge: true }
            );
            break;
        case 'phone':
            res = await user.set(
                {
                    phone: value,
                },
                { merge: true }
            );
            break;
        case 'occupation':
            res = await user.set(
                {
                    occupation: value,
                },
                { merge: true }
            );
            break;
        case 'country':
            res = await user.set(
                {
                    country: value,
                },
                { merge: true }
            );
            break;
        case 'city':
            res = await user.set(
                {
                    city: value,
                },
                { merge: true }
            );
            break;
        case 'address':
            res = await user.set(
                {
                    address: value,
                },
                { merge: true }
            );
            break;
        case 'postalcode':
            res = await user.set(
                {
                    postalcode: value,
                },
                { merge: true }
            );
            break;
        case 'dateofbirth':
            res = await user.set(
                {
                    dateofbirth: value,
                },
                { merge: true }
            );
            break;
        case 'drivinglicense':
            res = await user.set(
                {
                    drivinglicense: value,
                },
                { merge: true }
            );
            break;
        case 'nationality':
            res = await user.set(
                {
                    dateofbirth: value,
                },
                { merge: true }
            );
            break;
        case 'dateofbirth':
            res = await user.set(
                {
                    dateofbirth: value,
                },
                { merge: true }
            );
            break;
        default:
            break;
    }
}
/// Function to generate an id of a given length
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function getResumesOfUser(u) {
    const db = fire.firestore();
    const resumesRef = await db.collection('users').doc(u).collection('resumes').get();
    var resumes = [];
    for (let index = 0; index < resumesRef.docs.length; index++) {
        resumes[index] = resumesRef.docs[index].data();
        resumes[index].id = resumesRef.docs[index].id;
    }
    return resumes;
}

// getCoversOfUser
export async function getCoversOfUser(u) {
    const db = fire.firestore();
    const coversRef = await db.collection('users').doc(u).collection('covers').get();
    var covers = [];
    for (let index = 0; index < coversRef.docs.length; index++) {
        covers[index] = { item: coversRef.docs[index].data() };
        covers[index].id = coversRef.docs[index].id;
    }
    return covers;
}

// a function that add 1 to the number of documents generated
// target : 'users/uid/states'

export async function addOneToNumberOfDocumentsGenerated(uid) {
    
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var states = user.data().states;
        if (states === undefined) {
            states = {};
        }
        if (states.documentsGenerated === undefined) {
            states.documentsGenerated = 0;
        }
        states.documentsGenerated = states.documentsGenerated + 1;
        userRef.set(
            {
                states: states,
            },
            { merge: true }
        );
    }
}

// a function that add 1 to the number of documents downloaded
// target : 'users/uid/states'

export async function addOneToNumberOfDocumentsDownloaded(uid) {
    if(uid === null) return;
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var states = user.data().states;
        if (states == undefined) {
            states = {};
        }
        if (states.documentsDownloaded === undefined) {
            states.documentsDownloaded = 0;
        }
        states.documentsDownloaded = states.documentsDownloaded + 1;
        userRef.set(
            {
                states: states,
            },
            { merge: true }
        );
    }
}

// a function that add 1 to the number of documents visited
// target : 'users/uid/states'

export async function addOneToNumberOfDocumentsVisited(uid) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var states = user.data().states;
        if (states === undefined) {
            states = {};
        }
        if (states.documentsVisited === undefined) {
            states.documentsVisited = 0;
        }
        states.documentsVisited = states.documentsVisited + 1;
        userRef.set(
            {
                states: states,
            },
            { merge: true }
        );
    }
}

// afunction that gets states of a user
// target : 'users/uid/states'

export async function getStatesOfUser(uid) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var states = user.data().states;
        if (states === undefined) {
            states = {};
        }
        return states;
    }
}

// a function that take data url and add image to firebase /users/uid/profile
export async function uploadImageToFirebase(dataUrl, uid) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var profile = user.data().profile;
        if (profile == undefined) {
            profile = {};
        }
        profile.image = dataUrl;
        userRef.set(
            {
                profile: profile,
            },
            { merge: true }
        );
    }
}

// create a function that take as a parameters uid,field,value
// and add it to /users/uid/profile

export async function addFieldToProfile(uid, field, value) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var profile = user.data().profile;
        if (profile === undefined) {
            profile = {};
        }
        profile[field] = value;
        userRef.set(
            {
                profile: profile,
            },
            { merge: true }
        );
    }
}

// get profile of a user

export async function getProfileOfUser(uid) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var profile = user.data().profile;
        if (profile === undefined) {
            profile = {};
        }
        return profile;
    }
}

// add profile to a user
// the profile cotnains
// name: '',
// phone: '',
// address: '',
// city: '',
// postalCode: '',
// country: '',
// selectedImage: null

export async function addProfileToUser(uid, profile) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        userRef.set(
            {
                profile: profile,
            },
            { merge: true }
        );
        return true;
    } else {
        return false;
    }
}

// get account info

// /users/uid

export async function getAccountInfo(uid) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        return user.data();
    } else {
        return null;
    }
}

// add a skill to a user
// /users/uid/skills

export async function addSkillToUser(uid, skill) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var skills = user.data().skills;
        if (skills === undefined) {
            skills = [];
        }
        skills.push(skill);
        userRef.set(
            {
                skills: skills,
            },
            { merge: true }
        );
    }
}
// remove a skill from a user
// /users/uid/skills

export async function removeSkillFromUser(uid, skill) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var skills = user.data().skills;
        if (skills === undefined) {
            skills = [];
        }
        skills = skills.filter((item) => item !== skill);
        userRef.set(
            {
                skills: skills,
            },
            { merge: true }
        );
        return true;
    } else {
        return false;
    }
}

// get skills of a user
// /users/uid/skills

export async function getSkillsOfUser(uid) {
    const db = fire.firestore();
    const userRef = await db.collection('users').doc(uid);
    const user = await userRef.get();
    if (user.exists) {
        var skills = user.data().skills;
        if (skills === undefined) {
            skills = [];
        }
        return skills;
    }
}


// in firestore add a review collection to /reviwes
// the review collection contains
// name: '',
// rating: 0,
// review
// imageUrl: '',
// date: new Date()

export async function addReview( review) {

    const db = fire.firestore();
    const reviewRef = await db.collection('reviews').doc();
    reviewRef.set(review);
    return true;
}

// add global rating to a /data/meta
// make sure to note remove the current data that is in meta 

export async function addGlobalRating(rating) {
    const db = fire.firestore();
    const metaRef = await db.collection('data').doc('meta');
    const meta = await metaRef.get();
    if (meta.exists) {
        var metaRating = meta.data().rating;
        if (metaRating === undefined) {
            metaRating = 0;
        }
       metaRating = rating;
        metaRef.set(
            {
                rating: metaRating,
            },
            { merge: true }
        );
        return true;
    } else {
        return false;
    }
}



// get all reviews make sure every id is with there response

export async function getAllReviews() {
    
    const db = fire.firestore();
    const reviewsRef = await db.collection('reviews').get();
    const reviews = reviewsRef.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    return reviews;
}

// get only 3 reviews

export async function get3Reviews() {
    const db = fire.firestore();
    const reviewsRef = await db.collection('reviews').limit(3).get();
    const reviews = reviewsRef.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
    return reviews;
}



// delete a review

export async function deleteReview(id) {
    const db = fire.firestore();
    const reviewRef = await db.collection('reviews').doc(id);
    reviewRef.delete();
    return true;
}


//


// in firstore add category collection with name  to /categories

export async function addCategoryToData(categoryName) {
    const db = fire.firestore();
    const categoryRef = await db.collection('categories').doc(categoryName);
    const category = await categoryRef.get();
    if (!category.exists) {
        categoryRef.set({
            name: categoryName,
            phrases: [],
        });
    } else {
        // add to categories dierctly
        db.collection('categories').doc(categoryName).set(
            {
                name: categoryName,
                phrases: [],
            },
            { merge: true }
        );
    }
    // if it is added succefully return true otherwise false
    return true;
}
// get all categories

export async function getAllCategories() {
    const db = fire.firestore();
    const categoriesRef = await db.collection('categories').get();
    var categories = [];
    categoriesRef.forEach((category) => {
        categories.push(category.data());
    });
    return categories;
}
// remove a category by name
// first check if exist if not return false
// if exist remove it and return true

export async function removeCategoryByName(categoryName) {
    const db = fire.firestore();
    const categoryRef = await db.collection('categories').doc(categoryName);
    const category = await categoryRef.get();
    if (category.exists) {
        categoryRef.delete();
        return true;
    } else {
        return false;
    }
}

// add a phrase to a category
// first check if category exist if not return false
// if exist add phrase to it and return true

export async function addPhraseToCategory(categoryName, phrase) {
    const db = fire.firestore();
    const categoryRef = await db.collection('categories').doc(categoryName);
    const category = await categoryRef.get();
    if (category.exists) {
        var phrases = category.data().phrases;
        if (phrases === undefined) {
            phrases = [];
        }
        phrases.push(phrase);
        categoryRef.set(
            {
                phrases: phrases,
            },
            { merge: true }
        );
        return true;
    } else {
        return false;
    }
}

// get all phrases of a category

export async function getPhrasesOfCategory(categoryName) {
    const db = fire.firestore();
    const categoryRef = await db.collection('categories').doc(categoryName);
    const category = await categoryRef.get();
    if (category.exists) {
        var phrases = category.data().phrases;
        if (phrases === undefined) {
            phrases = [];
        }
        return phrases;
    }
}

// remove a phrase from a category

export async function removePhraseFromCategory(categoryName, phrase) {
    const db = fire.firestore();
    const categoryRef = await db.collection('categories').doc(categoryName);
    const category = await categoryRef.get();
    if (category.exists) {
        var phrases = category.data().phrases;
        if (phrases === undefined) {
            phrases = [];
        }
        var index = phrases.indexOf(phrase);
        if (index > -1) {
            phrases.splice(index, 1);
        }
        categoryRef.set(
            {
                phrases: phrases,
            },
            { merge: true }
        );
        return true;
    } else {
        return false;
    }
}

//

export default addResume;
