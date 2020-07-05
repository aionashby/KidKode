package com.google.sps.servlets;

import java.util.HashMap; 
import java.util.ArrayList;
import java.io.PrintWriter;
import java.io.IOException;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse; 
@WebServlet("/result")
public class DataServlet extends HttpServlet {

    public class Result {
        private String title;
        private String description;
        private String mainImagePath;
        private ArrayList <String> links; 

        //constructor takes the code for each career (use same code for career in the dropdown Html) 
        //example with ux below
        public Result(String code) { 
            if (code.equals("ux")) {
                this.title = new String("User Experience/User Interface Design");
                this.description = new String("A User interface (UI for short) is the way the person using a product (the user) interacts with a website, app, or piece of technology (a good example is a TV remote). UI designers design the way apps and website look so that their apps have a good User Experience. User Experience (or UX for short) often involves researching and testing what design works best for users so that the app is easy to use and effective! A good user experience depends on the age, interests, abilities and needs of the person using your app. If you like solving problems, designing and being creative this is a good field for you!");
                this.mainImagePath = new String("https://careerfoundry.com/en/blog/uploads/difference-between-ux-ui-ux-ui-min.png");
                this.links = new ArrayList <String>();
                links.add("https://www.commonsensemedia.org/app-reviews/build-a-truck-by-duck-duck-moose");
                links.add("https://www.commonsensemedia.org/app-reviews/creativas-fashion-design-studio");
                links.add("https://appinventor.mit.edu/"); 
            }
            else if (code.equals("vid")) {
                this.title = new String("Game Development");
                this.description = new String("Game Development is the process of making a video game. There are lots of roles and parts to game developement. You first begin with an idea, concept or story for a game. After planning out how you want to build your game, you will code the logic of the game, create art to make it look nice, add sounds and music to it, and test it until you have a fully completed game!");
                this.mainImagePath = new String("https://spzone-simpleprogrammer.netdna-ssl.com/wp-content/uploads/2018/01/Videogame.png");
                this.links = new ArrayList <String>();
                links.add("https://codecombat.com/");
                links.add("https://www.tynker.com/");
                links.add("https://www.minecraft.net/en-us/");
                links.add("https://gamestarmechanic.com/");
            }
            //add rest of career paths info here in same format as above 
        }
    }
    
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String code = request.getParameter("branchCode");
        Result data = new Result(code);
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println("<h1>You might like " + data.title + "!</h1>");
        response.getWriter().println("<img src=" + data.mainImagePath + "><img>");
        response.getWriter().println("<p>" + data.description + "</p>");
        response.getWriter().println("<h3>Check out some cool resources and games related to your interests below:</h3>");
        int numLinks = data.links.size();
        for (int i = 0; i < numLinks; i++) {
            response.getWriter().println("<li><a href=" + data.links.get(i) + ">" + data.links.get(i) + "</a></li>");
        }
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    }
}

