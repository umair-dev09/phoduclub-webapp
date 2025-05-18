// The Cloud Functions for Firebase SDK to set up triggers and logging.
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");

// The Firebase Admin SDK
const admin = require("firebase-admin");
admin.initializeApp();

// // HTTP endpoint to trigger the user data migration manually
// exports.triggerUserDataMigration = onRequest(async (request, response) => {
//     try {
//         const db = admin.firestore();
//         logger.info('Starting manual user data migration process');
        
//         // Process users collection
//         logger.info('Processing users collection');
//         const usersSnapshot = await db.collection('users').get();
        
//         if (!usersSnapshot.empty) {
//             const usersBatch = db.batch();
//             let usersCount = 0;
            
//             usersSnapshot.forEach(doc => {
//                 const userData = doc.data();
//                 // Check if the document has both userId and uniqueId fields
//                 if (userData.userId && userData.uniqueId) {
//                     // Swap userId and uniqueId fields
//                     const tempUniqueId = userData.uniqueId;  // Store Auth ID
//                     const tempUserId = userData.userId;      // Store display name
                    
//                     usersBatch.update(doc.ref, {
//                         userId: tempUniqueId,    // Auth ID goes to userId
//                         uniqueId: tempUserId     // Display name goes to uniqueId
//                     });
//                     usersCount++;
//                     logger.info(`User ${doc.id}: Swapping userId (${tempUserId}) with uniqueId (${tempUniqueId})`);
//                 }
//             });
            
//             if (usersCount > 0) {
//                 await usersBatch.commit();
//                 logger.info(`Successfully migrated ${usersCount} user documents`);
//             } else {
//                 logger.info('No user documents needed migration');
//             }
//         } else {
//             logger.info('No users found');
//         }
        
//         // Process admin collection
//         logger.info('Processing admin collection');
//         const adminsSnapshot = await db.collection('admin').get();
        
//         if (!adminsSnapshot.empty) {
//             const adminsBatch = db.batch();
//             let adminsCount = 0;
            
//             adminsSnapshot.forEach(doc => {
//                 const adminData = doc.data();
//                 // Check if the document has both adminId and userId fields
//                 if (adminData.adminId && adminData.userId) {
//                     // Move adminId to userId and current userId to uniqueId
//                     const authId = adminData.adminId;       // Store Auth ID
//                     const displayId = adminData.userId;     // Store display name
                    
//                     let updateData = {
//                         userId: authId,         // Auth ID goes to userId
//                         uniqueId: displayId     // Display name goes to uniqueId
//                     };
                    
//                     // If adminId field should be removed
//                     if (!adminData.uniqueId) {  // Only if uniqueId doesn't exist yet
//                         // Use admin.firestore.FieldValue.delete() to remove the field
//                         updateData.adminId = admin.firestore.FieldValue.delete();
//                     }
                    
//                     adminsBatch.update(doc.ref, updateData);
//                     adminsCount++;
//                     logger.info(`Admin ${doc.id}: Moving adminId (${authId}) to userId and userId (${displayId}) to uniqueId`);
//                 }
//             });
            
//             if (adminsCount > 0) {
//                 await adminsBatch.commit();
//                 logger.info(`Successfully migrated ${adminsCount} admin documents`);
//             } else {
//                 logger.info('No admin documents needed migration');
//             }
//         } else {
//             logger.info('No admins found');
//         }
        
//         response.json({
//             success: true,
//             message: 'User data migration completed successfully'
//         });
//     } catch (error) {
//         logger.error('Error in manual user data migration:', error);
//         response.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// });

//courseStartFunction
exports.courseStartFunction = onSchedule("* * * * *", async (event) => {
    try {
        const db = admin.firestore();
        
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        // Add 5 hours and 30 minutes to get IST
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        
        const currentTime = now.toISOString().split('.')[0];
        
        logger.info(`Checking courses at IST: ${currentTime}`);
        
        // Query for courses that are upcoming
        const snapshot = await db.collection('course')
        .where('status', '==', 'scheduled')
        .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const courseData = doc.data();
                if (courseData.startDate && courseData.startDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'live'
                    });
                    updateCount++;
                    logger.info(`Marking course ${doc.id} as live. startDate: ${courseData.startDate}`);
                }
            });
            
            if (updateCount > 0) {
                await batch.commit();
                logger.info(`Successfully updated ${updateCount} courses to live status`);
            } else {
                logger.info('No courses needed updating at this time');
            }
        } else {
            logger.info('No upcoming courses found');
        }
        
        return null;
    } catch (error) {
        logger.error('Error in courseStartFunction:', error);
        throw error;
    }
});
//courseEndFunction
exports.courseEndFunction = onSchedule("* * * * *", async (event) => {
    try {
        const db = admin.firestore();
        
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        // Add 5 hours and 30 minutes to get IST
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        
        const currentTime = now.toISOString().split('.')[0];
        
        logger.info(`Checking courses at IST: ${currentTime}`);
        
        // Query for courses that are upcoming
        const snapshot = await db.collection('course')
            .where('status', 'in', ['live','paused'])
            .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const courseData = doc.data();
                // Only update if scheduledDate is past current time
                if (courseData.endDate && courseData.endDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'finished'
                    });
                    updateCount++;
                    logger.info(`Marking course ${doc.id} as finished. endDate: ${courseData.endDate}`);
                }
            });
            
            if (updateCount > 0) {
                await batch.commit();
                logger.info(`Successfully updated ${updateCount} courses to finished status`);
            } else {
                logger.info('No courses needed updating at this time');
            }
        } else {
            logger.info('No upcoming courses found');
        }
        
        return null;
    } catch (error) {
        logger.error('Error in courseEndFunction:', error);
        throw error;
    }
});
//quizStartFunction
exports.quizStartFunction = onSchedule("* * * * *", async (event) => {
    try {
        const db = admin.firestore();
        
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        // Add 5 hours and 30 minutes to get IST
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        
        const currentTime = now.toISOString().split('.')[0];
        
        logger.info(`Checking quizzes at IST: ${currentTime}`);
        
        // Query for courses that are upcoming
        const snapshot = await db.collection('quiz')
        .where('status', '==', 'scheduled')
            .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const courseData = doc.data();
                if (courseData.startDate && courseData.startDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'live'
                    });
                    updateCount++;
                    logger.info(`Marking quiz ${doc.id} as live. startDate: ${courseData.startDate}`);
                }
            });
            
            if (updateCount > 0) {
                await batch.commit();
                logger.info(`Successfully updated ${updateCount} quizzes to live status`);
            } else {
                logger.info('No quizzes needed updating at this time');
            }
        } else {
            logger.info('No upcoming quizzes found');
        }
        
        return null;
    } catch (error) {
        logger.error('Error in quizStartFunction:', error);
        throw error;
    }
});
//quizEndFunction
exports.quizEndFunction = onSchedule("* * * * *", async (event) => {
    try {
        const db = admin.firestore();
        
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        // Add 5 hours and 30 minutes to get IST
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        
        const currentTime = now.toISOString().split('.')[0];
        
        logger.info(`Checking quizzes at IST: ${currentTime}`);
        
        // Query for courses that are upcoming
        const snapshot = await db.collection('quiz')
        .where('status', 'in', ['live','paused'])
        .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const courseData = doc.data();
                // Only update if scheduledDate is past current time
                if (courseData.endDate && courseData.endDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'finished'
                    });
                    updateCount++;
                    logger.info(`Marking quiz ${doc.id} as finished. endDate: ${courseData.endDate}`);
                }
            });
            
            if (updateCount > 0) {
                await batch.commit();
                logger.info(`Successfully updated ${updateCount} quizzes to finished status`);
            } else {
                logger.info('No quizzes needed updating at this time');
            }
        } else {
            logger.info('No upcoming quiz found');
        }
        
        return null;
    } catch (error) {
        logger.error('Error in quizEndFunction:', error);
        throw error;
    }
});
//testStartFunction
exports.testStartFunction = onSchedule("* * * * *", async (event) => {
    try {
        const db = admin.firestore();
        
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        // Add 5 hours and 30 minutes to get IST
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        
        const currentTime = now.toISOString().split('.')[0];
        
        logger.info(`Checking testseries at IST: ${currentTime}`);
        
        // Query for courses that are upcoming
        const snapshot = await db.collection('testseries')
        .where('status', '==', 'scheduled')
            .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const courseData = doc.data();
                if (courseData.startDate && courseData.startDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'live'
                    });
                    updateCount++;
                    logger.info(`Marking test ${doc.id} as live. startDate: ${courseData.startDate}`);
                }
            });
            
            if (updateCount > 0) {
                await batch.commit();
                logger.info(`Successfully updated ${updateCount} test to live status`);
            } else {
                logger.info('No test needed updating at this time');
            }
        } else {
            logger.info('No upcoming test found');
        }
        
        return null;
    } catch (error) {
        logger.error('Error in testStartFunction:', error);
        throw error;
    }
});
//testEndFunction
exports.testEndFunction = onSchedule("* * * * *", async (event) => {
    try {
        const db = admin.firestore();
        
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        // Add 5 hours and 30 minutes to get IST
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        
        const currentTime = now.toISOString().split('.')[0];
        
        logger.info(`Checking testseries at IST: ${currentTime}`);
        
        // Query for courses that are upcoming
        const snapshot = await db.collection('testseries')
        .where('status', 'in', ['live','paused'])
        .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const courseData = doc.data();
                // Only update if scheduledDate is past current time
                if (courseData.endDate && courseData.endDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'finished'
                    });
                    updateCount++;
                    logger.info(`Marking test ${doc.id} as finished. endDate: ${courseData.endDate}`);
                }
            });
            
            if (updateCount > 0) {
                await batch.commit();
                logger.info(`Successfully updated ${updateCount} tests to finished status`);
            } else {
                logger.info('No tests needed updating at this time');
            }
        } else {
            logger.info('No upcoming tests found');
        }
        
        return null;
    } catch (error) {
        logger.error('Error in testEndFunction:', error);
        throw error;
    }
});
//notificationStartFunction
exports.notificationStartFunction = onSchedule("* * * * *", async (event) => {
    try {
        const db = admin.firestore();
        
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        // Add 5 hours and 30 minutes to get IST
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        
        const currentTime = now.toISOString().split('.')[0];
        
        logger.info(`Checking notifications at IST: ${currentTime}`);
        
        const snapshot = await db.collection('notifications')
        .where('status', '==', 'scheduled')
            .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const notiData = doc.data();

                if (notiData.startDate && notiData.startDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'live'
                    });
                    updateCount++;
                    logger.info(`Marking notification ${doc.id} as live. startDate: ${notiData.startDate}`);
                }
            });
            
            if (updateCount > 0) {
                await batch.commit();
                logger.info(`Successfully updated ${updateCount} notifications to live status`);
            } else {
                logger.info('No notifications needed updating at this time');
            }
        } else {
            logger.info('No upcoming notifications found');
        }
        
        return null;
    } catch (error) {
        logger.error('Error in notificationStartFunction:', error);
        throw error;
    }
});
//notificationEndFunction
exports.notificationEndFunction = onSchedule("* * * * *", async (event) => {
    try {
        const db = admin.firestore();
        
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        // Add 5 hours and 30 minutes to get IST
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        
        const currentTime = now.toISOString().split('.')[0];
        
        logger.info(`Checking notifications at IST: ${currentTime}`);
        
        const snapshot = await db.collection('notifications')
        .where('status', 'in', ['live','paused'])
        .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const notiData = doc.data();

                if (notiData.endDate && notiData.endDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'finished'
                    });
                    updateCount++;
                    logger.info(`Marking notification ${doc.id} as finished. endDate: ${notiData.endDate}`);
                }
            });
            
            if (updateCount > 0) {
                await batch.commit();
                logger.info(`Successfully updated ${updateCount} notifications to finished status`);
            } else {
                logger.info('No notifications needed updating at this time');
            }
        } else {
            logger.info('No upcoming notifications found');
        }
        
        return null;
    } catch (error) {
        logger.error('Error in notificationStartFunction:', error);
        throw error;
    }
});
//courseSectionScheduleFunction
exports.courseSectionScheduleFunction = onSchedule("* * * * *", async (event) => {
    try {
        const db = admin.firestore();
        
        // Get current time in IST (UTC+5:30)
        const now = new Date();
        now.setHours(now.getHours() + 5);
        now.setMinutes(now.getMinutes() + 30);
        
        const currentTime = now.toISOString().split('.')[0];
        
        logger.info(`Checking course sections at IST: ${currentTime}`);
        
        // Get all courses that are live or paused
        const courseSnapshot = await db.collection('course')
            .where('status', 'in', ['live', 'paused'])
            .get();
        
        if (!courseSnapshot.empty) {
            let totalUpdates = 0;
            
            // Process each course
            for (const courseDoc of courseSnapshot.docs) {
                // Get sections subcollection for each course
                const sectionsSnapshot = await courseDoc.ref.collection('sections')
                    .where('status', '==', 'scheduled')
                    .get();
                
                if (!sectionsSnapshot.empty) {
                    const batch = db.batch();
                    let sectionUpdateCount = 0;
                    
                    sectionsSnapshot.forEach(sectionDoc => {
                        const sectionData = sectionDoc.data();
                        if (sectionData.sectionScheduleDate && sectionData.sectionScheduleDate <= currentTime) {
                            batch.update(sectionDoc.ref, { 
                                status: 'live'
                            });
                            sectionUpdateCount++;
                            logger.info(`Marking section ${sectionDoc.id} as live in course ${courseDoc.id}. scheduleDate: ${sectionData.sectionScheduleDate}`);
                        }
                    });
                    
                    if (sectionUpdateCount > 0) {
                        await batch.commit();
                        totalUpdates += sectionUpdateCount;
                    }
                }
            }
            
            if (totalUpdates > 0) {
                logger.info(`Successfully updated ${totalUpdates} sections to live status`);
            } else {
                logger.info('No sections needed updating at this time');
            }
        } else {
            logger.info('No active courses found');
        }
        
        return null;
    } catch (error) {
        logger.error('Error in courseSectionScheduleFunction:', error);
        throw error;
    }
});
//userDataMigrationFunction - Swap userId and uniqueId fields for users and admins
exports.userDataMigrationFunction = onSchedule("0 0 * * *", async (event) => {
    try {
        const db = admin.firestore();
        logger.info('Starting user data migration process');
        
        // Process users collection
        logger.info('Processing users collection');
        const usersSnapshot = await db.collection('users').get();
        
        if (!usersSnapshot.empty) {
            const usersBatch = db.batch();
            let usersCount = 0;
            
            usersSnapshot.forEach(doc => {
                const userData = doc.data();
                // Check if the document has both userId and uniqueId fields
                if (userData.userId && userData.uniqueId) {
                    // Swap userId and uniqueId fields
                    const tempUniqueId = userData.uniqueId;  // Store Auth ID
                    const tempUserId = userData.userId;      // Store display name
                    
                    usersBatch.update(doc.ref, {
                        userId: tempUniqueId,    // Auth ID goes to userId
                        uniqueId: tempUserId     // Display name goes to uniqueId
                    });
                    usersCount++;
                    logger.info(`User ${doc.id}: Swapping userId (${tempUserId}) with uniqueId (${tempUniqueId})`);
                }
            });
            
            if (usersCount > 0) {
                await usersBatch.commit();
                logger.info(`Successfully migrated ${usersCount} user documents`);
            } else {
                logger.info('No user documents needed migration');
            }
        } else {
            logger.info('No users found');
        }
        
        // Process admin collection
        logger.info('Processing admin collection');
        const adminsSnapshot = await db.collection('admin').get();
        
        if (!adminsSnapshot.empty) {
            const adminsBatch = db.batch();
            let adminsCount = 0;
            
            adminsSnapshot.forEach(doc => {
                const adminData = doc.data();
                // Check if the document has both adminId and userId fields
                if (adminData.adminId && adminData.userId) {
                    // Move adminId to userId and current userId to uniqueId
                    const authId = adminData.adminId;       // Store Auth ID
                    const displayId = adminData.userId;     // Store display name
                    
                    let updateData = {
                        userId: authId,         // Auth ID goes to userId
                        uniqueId: displayId     // Display name goes to uniqueId
                    };
                    
                    // If adminId field should be removed
                    if (!adminData.uniqueId) {  // Only if uniqueId doesn't exist yet
                        // Use admin.firestore.FieldValue.delete() to remove the field
                        updateData.adminId = admin.firestore.FieldValue.delete();
                    }
                    
                    adminsBatch.update(doc.ref, updateData);
                    adminsCount++;
                    logger.info(`Admin ${doc.id}: Moving adminId (${authId}) to userId and userId (${displayId}) to uniqueId`);
                }
            });
            
            if (adminsCount > 0) {
                await adminsBatch.commit();
                logger.info(`Successfully migrated ${adminsCount} admin documents`);
            } else {
                logger.info('No admin documents needed migration');
            }
        } else {
            logger.info('No admins found');
        }
        
        logger.info('User data migration completed successfully');
        return null;
    } catch (error) {
        logger.error('Error in userDataMigrationFunction:', error);
        throw error;
    }
});