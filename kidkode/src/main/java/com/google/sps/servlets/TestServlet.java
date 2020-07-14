package com.google.sps.servlets;

import com.google.sps.data.ReadFile;
import javax.servlet.RequestDispatcher;  
import java.io.PrintWriter;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse; 
@WebServlet("/testServlet")
public class TestServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //right now this is hard coded in, but once we connect to the front end we can chage this to a variable
        ReadFile uxText = new ReadFile("artText/UXData.txt");
        request.setAttribute("text", uxText);
        RequestDispatcher rd = request.getRequestDispatcher("display.jsp");
        try {
            rd.forward(request,response);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

}