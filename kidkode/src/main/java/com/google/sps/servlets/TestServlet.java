package com.google.sps.servlets;

import com.google.sps.data.ReadFile;
import javax.servlet.RequestDispatcher;  
import java.io.PrintWriter;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse; 
@WebServlet("/result")
public class TestServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //right now this is hard coded in, but once we connect to the front end we can chage this to a variable
        ReadFile uxText = new ReadFile("artText/VR.txt");
        request.setAttribute("text", uxText);
        RequestDispatcher rd = request.getRequestDispatcher("display.jsp");
        try {
            rd.forward(request,response);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    // retrieve the name of the highest scoring career and alert the user the name of the career
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String data = request.getParameter("bestCareer");
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(data);
    }

}