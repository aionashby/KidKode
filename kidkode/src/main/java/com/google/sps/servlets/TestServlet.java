package com.google.sps.servlets;

import com.google.sps.data.ReadFile;
import java.util.HashMap;
import javax.servlet.RequestDispatcher;  
import java.io.PrintWriter;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse; 
@WebServlet("/result")
public class TestServlet extends HttpServlet {
    private String career; 
    private String field; 
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HashMap<String, String> fileMappings = new HashMap<String, String>();

        //art text
        fileMappings.put("User Experience Design/User Interface Design (UX/UI)", "UX");
        fileMappings.put("Data Visualization Engineer", "dataVisEng");
        fileMappings.put("Flash Design", "flashDes");
        fileMappings.put("Game Development", "gameDev");
        fileMappings.put("Computer Graphics Researcher", "graphResearch");
        fileMappings.put("Graphics Software Engineer", "graphSWE");
        fileMappings.put("Interaction Design", "intDes");
        fileMappings.put("Video Game Technical Art", "VGTA");
        fileMappings.put("Virtual Reality", "VR");
        fileMappings.put("Web Development", "VR");
       
        //brain texts
        fileMappings.put("Computer Vision Engineer", "VGTA");
        fileMappings.put("Data Scientist", "dataScientist.txt");
        fileMappings.put("Deep Learning Research Engineer", "deepLearnResEng");
        fileMappings.put("Machine Learning Engineer", "machLearnEng");

        //build text 
        fileMappings.put("Computer Hardware Engineer", "compHardEng");
        fileMappings.put("Electrical Engineer", "electricalEng");
        fileMappings.put("Electronics Engineer", "electronicsEng");
        fileMappings.put("Robotics Engineer", "robotEng");

        //problem solving text 
        fileMappings.put("Game Director", "gameDirector");//+ must change file name and occurences in json to make it correct
        fileMappings.put("Game Production", "gameProduction");
        fileMappings.put("Game Programming", "gameProgramming");
        fileMappings.put("Game Tester", "gameTester");
        fileMappings.put("IT Operations Analyst","ITOperationsAnalyst"); //? needs extra words to make it grammatically correct
        fileMappings.put("Mobile App Development", "mobileAppDev");
        fileMappings.put("Network Administrator", "networkAdmin");//+
        fileMappings.put("Network Architecture", "networkArchitect");//+
        fileMappings.put("Network Design", "networkDesigner");//+
        fileMappings.put("Network Engineer", "networkEngineer");//+
        fileMappings.put("Software Architect", "softwareArchitect");//+
        fileMappings.put("Software Developer", "softwareDevelop");
        fileMappings.put("Software Engineer", "softwareEngineer");//+
        fileMappings.put("Software Release Management", "softwareReleaseManage");
        fileMappings.put("Software Tester", "softwareTester");//+
        fileMappings.put("Statistical Programmer", "statsProgram");//+
        fileMappings.put("Systems Administrator", "systemAdmin");//+
        fileMappings.put("Systems Analyst", "systemAnalyst");//?
        fileMappings.put("Systems Architecture", "systemsArchitect");
        fileMappings.put("Systems Engineer", "systemsEng");//+

        //safety text
        fileMappings.put("Ethical Hacker", "ethHacker");//+
        fileMappings.put("Security Administrator", "securAdmin");//+
        fileMappings.put("Security Analyst", "securAnalyst");//?
        fileMappings.put("Security Engineer", "secureEng");//+

        //science text
        fileMappings.put("Aerospace Software Engineer", "AerospaceSoftEng");//+
        fileMappings.put("Bioinformatics Software Engineer", "bioinfoSoftEng");//+ 
        fileMappings.put("Computer Forensics Investigator", "computerForensInvest");//+
        fileMappings.put("Health Informatics", "healthInfo");
        fileMappings.put("Health information Management", "healthInfoMang");
        fileMappings.put("Medical Software Engineer", "medicalSoftEng");//+
        fileMappings.put("Systems Engineer", "nurseInfo");//+
 
        //teaching text
        fileMappings.put("Computer Support Specialist", "compSuppSpec");//?
        fileMappings.put("Information Technology Consultant", "infoTechConsultant");//?
        fileMappings.put("Computer Science Professor", "compSciProf");//?
        fileMappings.put("IT Instructor", "itInstructor");//?

        //website text
        fileMappings.put("Back-End Engineer", "backendEng");//*
        fileMappings.put("Front-End Engineer", "frontendEng");//*
        fileMappings.put("Web Editor", "webEditor");//*
        fileMappings.put("Webmaster", "webmaster");//?

        String textPath = this.field + "Text/" + fileMappings.get(career) + ".txt";
        ReadFile text = new ReadFile(textPath);
        request.setAttribute("text", text);
        RequestDispatcher rd = request.getRequestDispatcher("display.jsp");
        try {
            rd.forward(request,response);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        this.field = request.getParameter("activity");
        this.career = request.getParameter("bestCareer");
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(career);
        response.getWriter().write(field);
    }

}