package com.google.sps.data;
 
import java.io.File;
import java.util.Scanner;
 
public class ReadFile {
    private String path;
    private String title;
    private String description;
    private String mainImagePath;  
    private String[] links;    
    
    //constructor 
    public ReadFile(String path) {
        this.path = path;
        setFileOutput(path);
    }

    //getters for JSP
    public String getTitle() {
        return this.title;
    }
    
    public String getDescription() {
        return this.description;
    }
    public String getMainImagePath() {
        return this.mainImagePath;
    }

    public String[] getLinks() {
        return this.links;
    }

    private void setFileOutput(String path) {
        links = new String[3];
        Scanner scan = null;

        try {
            scan = new Scanner(new File(path), "UTF-8");

            this.title = scan.nextLine();
            this.description = scan.nextLine();        
            this.mainImagePath = scan.nextLine();            

            String link = "";
            int i = 0; 
            while (scan.hasNext() && ((link = scan.nextLine()) != null)) {
                this.links[i] = link;
                i++;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(scan != null) {
                scan.close();
                scan = null;
            }
        }
    }
 
}