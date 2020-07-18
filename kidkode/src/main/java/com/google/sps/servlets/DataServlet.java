package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse; 

@WebServlet("/chooseQuiz")
public class DataServlet extends HttpServlet {
    private String code;
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        this.code = request.getParameter("branchCode");
        if (this.code != null) {
            response.sendRedirect("/test_quiz.html?act="+ code);
        } 
        else {
            response.sendRedirect("/");
        }
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //require the user to select from the dropdown (redirect them to home)
        if (this.code == null) {
            response.sendRedirect("/");
        }
        //if they have already selected, let them just reload their last result
        else {
            doPost(request, response);
        }
    }
}



