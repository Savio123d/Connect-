package com.Connect.Utilidades;

public class TelefoneUtil {

    public static String formatar(String telefone) {
        if (telefone == null) return null;


        String numeros = telefone.replaceAll("[^0-9]", "");

        if (numeros.length() == 11) {
            String pais = "55"; // Brasil
            String ddd = numeros.substring(0, 2);
            String parte1 = numeros.substring(2, 7);
            String parte2 = numeros.substring(7);

            return "+" + pais + " (" + ddd + ") " + parte1 + "-" + parte2;
        } else if (numeros.length() == 13) {
            String pais = numeros.substring(0, 2);
            String ddd = numeros.substring(2, 4);
            String parte1 = numeros.substring(4, 9);
            String parte2 = numeros.substring(9);

            return "+" + pais + " (" + ddd + ") " + parte1 + "-" + parte2;
        } else {
            return telefone;
        }
    }
}
