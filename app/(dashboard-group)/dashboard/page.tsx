import "./dashboard.css"; // Adjust the path if needed
import Announcement from '@/components/DashboardComponents/HomeComponents/Announcement/Announcement';
import SubjectComp from '@/components/DashboardComponents/HomeComponents/SubjectComp/subject';
import TestSeries from '@/components/DashboardComponents/HomeComponents/TestSeries/Testseries';
import Course from '@/components/DashboardComponents/HomeComponents/Course/Course';

export default function AnalyticsPage() {
     return (
          <div className="homeContainer">
               <div className="topColumn">
                    <div className="progressTracker">
                         <div className="title">
                              <h3>Subject Progress Tracker</h3>
                         </div>
                         <div className="progress">
                              <SubjectComp/>
                         </div>
                    </div>
                    <div className="announcementBlock">
                         <div className="title">
                              <h3>Announcements</h3>
                         </div>
                         <div className="announcements">
                              <Announcement/>
                         </div>
                    </div>
               </div>
               <div className="bottomColumn">
                    <div className="testSeriesBlock">
                         <div className="title">
                              <h3>Test Series</h3>
                         </div>
                         <div className="testSeries">
                              <TestSeries/>
                         </div>
                    </div>
                    <div className="course">
                         <div className="title">
                              <h3>Courses</h3>
                         </div>
                         <div className="courses">
                              <Course/>
                         </div>                        
                    </div>
               </div>
          </div>
     );
}
