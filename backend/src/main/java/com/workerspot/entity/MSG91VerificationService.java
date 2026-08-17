package com.workerspot.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class MSG91VerificationService {

    private final RestClient restClient;

    @Value("${msg91.authkey}")
    private String authKey;

    @Value("${msg91.verify-url}")
    private String verifyUrl;

    public MSG91VerificationService(
            RestClient.Builder restClientBuilder
    ) {
        this.restClient = restClientBuilder.build();
    }

    public boolean verifyAccessToken(String accessToken) {

        if (accessToken == null || accessToken.trim().isEmpty()) {

            System.err.println(
                    "MSG91 access token is empty."
            );

            return false;
        }

        try {

            Map<String, String> requestBody =
                    Map.of(
                            "access-token",
                            accessToken.trim()
                    );

            System.out.println(
                    "================================="
            );

            System.out.println(
                    "MSG91 ACCESS TOKEN VERIFICATION"
            );

            System.out.println(
                    "Verify URL: " + verifyUrl
            );

            System.out.println(
                    "Auth key configured: " +
                    (authKey != null &&
                     !authKey.isBlank())
            );

            System.out.println(
                    "Access token received: true"
            );

            System.out.println(
                    "================================="
            );


            Map<?, ?> response =
                    restClient.post()

                            .uri(verifyUrl)

                            .header(
                                    "authkey",
                                    authKey
                            )

                            .contentType(
                                    MediaType.APPLICATION_JSON
                            )

                            .accept(
                                    MediaType.APPLICATION_JSON
                            )

                            .body(requestBody)

                            .retrieve()

                            .body(Map.class);


            System.out.println(
                    "MSG91 verification response: "
                    + response
            );


            if (response == null) {

                System.err.println(
                        "MSG91 returned null response."
                );

                return false;
            }


            Object type =
                    response.get("type");


            if (
                    "success".equalsIgnoreCase(
                            String.valueOf(type)
                    )
            ) {

                System.out.println(
                        "MSG91 access token verified successfully."
                );

                return true;
            }


            System.err.println(
                    "MSG91 access token verification failed."
            );

            return false;


        } catch (Exception e) {

            System.err.println(
                    "MSG91 verification request failed:"
            );

            e.printStackTrace();

            return false;
        }
    }
}