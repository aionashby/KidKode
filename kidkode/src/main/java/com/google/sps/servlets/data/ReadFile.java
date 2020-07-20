package com.google.sps.data;
 
import java.io.File;
import java.util.Scanner;
import java.util.ArrayList;
 
public class ReadFile {
    private String citation;
    private String path;
    private String title;
    private String description;
    private String mainImagePath;  
    private ArrayList<String> links;    
    
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

    public ArrayList<String> getLinks() {
        return this.links;
    }
    public String getCitation() {
        return this.citation;
    }

    private void setFileOutput(String path) {
        this.links = new ArrayList<String>();
        Scanner scan = null;

        try {
            scan = new Scanner(new File(path), "UTF-8");
            String firstLine = scan.nextLine();
            if (firstLine.startsWith("http")) {
                this.citation = firstLine;
                this.title = scan.nextLine();
                this.description = scan.nextLine();        
                this.mainImagePath = scan.nextLine();  
            }
            else {
                this.title = firstLine; 
                this.description = scan.nextLine();        
                this.mainImagePath = scan.nextLine(); 
                this.citation = null;    

            }              
            String currentLink = "";
            int i = 0; 
            while (scan.hasNext() && ((currentLink = scan.nextLine()) != null)) {
                this.links.add(currentLink);
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