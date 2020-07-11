package com.google.sps.data;
 
import java.io.File;
import java.util.Scanner;
 
public class ReadFile {

    private String fileOutput;
    private String path;

    public ReadFile(String path) {
        this.path = path;
        setFileOutput(path);
    }

    public String getFileOutput() {
        return fileOutput;
    }

    public void setFileOutput(String path) {
        Scanner scan = null;
        String s2 = path;
        StringBuffer buffer;
        try {
            buffer = new StringBuffer();
 
            scan = new Scanner(new File(path), "UTF-8");
 
            String readdata = "";
            while (scan.hasNext() && (readdata = scan.nextLine()) != null) {
                buffer.append(readdata).append('\n');
            }
            this.fileOutput = buffer.toString();

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