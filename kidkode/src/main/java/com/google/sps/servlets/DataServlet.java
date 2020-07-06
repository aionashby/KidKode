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
    private class Result {
        private String title;
        private String description;
        private String mainImagePath;
        private ArrayList <String> links; 
        
        //constructor takes the code for each career (use same code for career in the dropdown HTML) 
        public Result(String code) { 
            if (code.equals("ux")) {
                this.title = new String("User Experience/User Interface Design");
                this.description = new String("A User interface (UI for short) is the way the person using a product (the user) interacts with a website, app, or piece of technology (a good example is a TV remote). UI designers design the way apps and website look so that their apps have a good user experience. User Experience (or UX for short) often involves researching and testing what design works best for users so that the app is easy to use and effective! A good user experience depends on the age, interests, abilities and needs of the person using your app. If you like solving problems, designing, and being creative this is a good field for you!");
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
            else if (code.equals("vr")) {
                this.title = new String("Virtual Reality");
                this.description = new String ("Virtual Reality is a simulated experience that can be similar to or completely different from the real world. Applications of Virtual Reality can include entertainment and educational purposes. Virtual Reality allows you to bring your imagination to life! Anything you can imagine, you can create using VR! The world is your oyster using Virtual Reality and it allows your users to get an immersive and interactive experience into your wildest dreams! If you love creating your own worlds, immersive experiences, and fun adventures Virtual Reality may be for you!");
                this.mainImagePath = new String ("https://techerati.com/wp-content/uploads/2019/12/5g-gaming.jpg");
                this.links = new ArrayList <String>();
                links.add("https://pbskids.org/kartkingdom/");
                links.add("http://www.carnegiecyberacademy.com/");
                links.add("http://www.ourworld.com/ow/enablePlugin.jsp");
                links.add("https://www.animaljam.com/en");
            }
            //add rest of career paths info here in same format as above 
        }
    }
    private Result data; 
    private String code;
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (request.getParameter("branchCode") != null) {
            this.code = request.getParameter("branchCode"); 
            this.data = new Result(this.code);
        } 
        PrintWriter out = response.getWriter();
        String newline = System.getProperty("line.separator");
        response.setContentType("text/html;charset=UTF-8");
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<meta charset=\"utf-8\">");
        out.println("<link rel=\"stylesheet\" href=\"https://use.typekit.net/wdi1hdi.css\">");
        out.println("<style>");
        out.println("body{font-family: proxima-soft, sans-serif;}");
        out.println(".title{ color: #00C5A4;" + newline + "font-weight: bold;"+ newline + "text-align: center;}");
        out.println(".heading{ color: #000000;" +  newline + "font-weight: bold;"+ newline + "text-align: center;}");
        out.println("p {text-align: center;" + newline + "color:##717171;" + "margin: 2%;" + newline + "font-weight: 500;}");
        out.println("h3 {text-align: center;" + newline + "color:#000000;" + newline + "font-size: medium}");
        out.println("a {text-align: center;" + newline + "color: #00C5A4;}");
        out.println(".centerLinks {display: flex;"+ newline + "width: 50%;" + newline + "margin: 0 auto;" + newline + "justify-content: flex-start;" + newline + "flex-wrap: wrap;}");
        out.println("img {max-width: 40%;" + newline + "height: auto;}");
        out.println("</style>");
        out.println("</head>");
        out.println("</body>");
        out.println("<h2 class=\"heading\">You might like</h2>");
        out.println("<h1 class=\"title\">" + this.data.title + "!</h1>");
        out.println("<p><img src=" + this.data.mainImagePath + "><img></p>");
        out.println("<p>" + this.data.description + "</p>");
        out.println("<div class=\"centerLinks\">");
        out.println("<h3>Check out some cool resources and games related to your interests below:</h3>");
        int numLinks = this.data.links.size();
        for (int i = 0; i < numLinks; i++) {
            out.println("<li><a href=" + this.data.links.get(i) + ">" + this.data.links.get(i) + "</a></li>");
        }
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //require the user to select from the dropdown (redirect them to home)
        if (this.data == null) {
            response.sendRedirect("/");
        }
        //if they have already selected, let them just reload their last result
        else {
            doPost(request, response);
        }
    }
}



