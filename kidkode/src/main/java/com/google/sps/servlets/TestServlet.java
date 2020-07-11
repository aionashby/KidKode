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

        ReadFile uxText = new ReadFile("UXData.txt");
        request.setAttribute("text", uxText);
        RequestDispatcher rd = request.getRequestDispatcher("display.jsp");
        try {
            rd.forward(request,response);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

}