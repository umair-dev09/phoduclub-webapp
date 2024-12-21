// The Cloud Functions for Firebase SDK to set up triggers and logging.
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");

// The Firebase Admin SDK
const admin = require("firebase-admin");
admin.initializeApp();

exports.courseScheduleFunction = onSchedule("* * * * *", async (event) => {
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
        const snapshot = await db.collection('quiz')
            .where('status', '==', 'upcoming')
            .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const courseData = doc.data();
                // Only update if scheduledDate is past current time
                if (courseData.scheduledDate && courseData.scheduledDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'live'
                    });
                    updateCount++;
                    logger.info(`Marking course ${doc.id} as live. scheduledDate: ${courseData.scheduledDate}`);
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
        logger.error('Error in courseScheduleFunction:', error);
        throw error;
    }
});

exports.notificationScheduleFunction = onSchedule("* * * * *", async (event) => {
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
        const snapshot = await db.collection('notifications')
            .where('status', '==', 'scheduled')
            .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            let updateCount = 0;
            
            snapshot.forEach(doc => {
                const courseData = doc.data();
                // Only update if scheduledDate is past current time
                if (courseData.startDate && courseData.startDate <= currentTime) {
                    batch.update(doc.ref, { 
                        status: 'live'
                    });
                    updateCount++;
                    logger.info(`Marking course ${doc.id} as live. scheduledDate: ${courseData.startDate}`);
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
        logger.error('Error in courseScheduleFunction:', error);
        throw error;
    }
});