// The Cloud Functions for Firebase SDK to set up triggers and logging.
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");

// The Firebase Admin SDK
const admin = require("firebase-admin");
admin.initializeApp();
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
            .where('status', '==', 'live')
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
            .where('status', '==', 'live')
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
            .where('status', '==', 'live')
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
            .where('status', '==', 'live')
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