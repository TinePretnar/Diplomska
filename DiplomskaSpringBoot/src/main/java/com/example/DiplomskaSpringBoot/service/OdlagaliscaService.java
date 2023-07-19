package com.example.DiplomskaSpringBoot.service;

import com.example.DiplomskaSpringBoot.entity.Odlagalisca;
import com.example.DiplomskaSpringBoot.repository.OdlagaliscaRepository;
import org.springframework.stereotype.Service;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKBReader;
import org.locationtech.jts.io.WKTWriter;

import java.util.List;

@Service
public class OdlagaliscaService {

    private final OdlagaliscaRepository odlagaliscaRepository;

    public OdlagaliscaService(OdlagaliscaRepository odlagaliscaRepository) {
        this.odlagaliscaRepository = odlagaliscaRepository;
    }

    public List<Odlagalisca> getOdlagalisca() {
        List<Odlagalisca> odlagaliscaList = odlagaliscaRepository.findAll();

        // Convert each Odlagalisca's geometry to WKT string
        for (Odlagalisca odlagalisca : odlagaliscaList) {
            try {
                String wkbString = odlagalisca.getGeometry(); // Assuming getGeometry() returns the WKB as a string
                byte[] wkbBytes = hexStringToByteArray(wkbString);
                String wktString = convertWkbToWkt(wkbBytes);
                odlagalisca.setGeometry(wktString); // Assuming you have a setter for geometry_wkt
            } catch (ParseException e) {
                // Handle the exception (e.g., log the error, set a default value, etc.)
                e.printStackTrace();
            }
        }

        return odlagaliscaList;
    }
    public static String convertWkbToWkt(byte[] wkbBytes) throws ParseException {
        WKBReader wkbReader = new WKBReader();
        Geometry geometry = wkbReader.read(wkbBytes);

        WKTWriter wktWriter = new WKTWriter();
        return wktWriter.write(geometry);
    }
    public static byte[] hexStringToByteArray(String hexString) {
        int len = hexString.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(hexString.charAt(i), 16) << 4)
                    + Character.digit(hexString.charAt(i + 1), 16));
        }
        return data;
    }
}