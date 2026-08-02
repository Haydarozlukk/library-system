package com.example.library_system.service;

import com.example.library_system.dto.OpenLibrarySearchResult;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class OpenLibraryService {

    private final RestClient restClient = RestClient.create("https://openlibrary.org");

    private static final String FIELDS =
            "key,title,author_name,author_key,first_publish_year,isbn,cover_i,number_of_pages_median,language,publisher";

    public List<OpenLibrarySearchResult> search(String query) {
        return search(query, 12, true);
    }

    public List<OpenLibrarySearchResult> search(String query, int limit, boolean requireCover) {
        JsonNode response = restClient.get()
                .uri(uriBuilder -> uriBuilder.path("/search.json")
                        .queryParam("q", query)
                        .queryParam("limit", limit)
                        .queryParam("fields", FIELDS)
                        .build())
                .retrieve()
                .body(JsonNode.class);

        List<OpenLibrarySearchResult> results = new ArrayList<>();
        if (response == null || !response.has("docs")) {
            return results;
        }

        for (JsonNode doc : response.get("docs")) {
            String title = textOrNull(doc, "title");
            if (title == null) {
                continue;
            }

            Integer coverId = doc.has("cover_i") ? doc.get("cover_i").asInt() : null;
            if (requireCover && coverId == null) {
                continue;
            }
            String coverUrl = coverId != null
                    ? "https://covers.openlibrary.org/b/id/" + coverId + "-L.jpg"
                    : null;

            String authorName = firstText(doc, "author_name", "Bilinmeyen Yazar");
            String authorKey = firstText(doc, "author_key", null);
            String authorPhotoUrl = authorKey != null
                    ? "https://covers.openlibrary.org/a/olid/" + authorKey + "-M.jpg"
                    : null;

            results.add(new OpenLibrarySearchResult(
                    textOrNull(doc, "key"),
                    title,
                    authorName,
                    doc.has("first_publish_year") ? doc.get("first_publish_year").asInt() : null,
                    firstText(doc, "isbn", null),
                    coverUrl,
                    authorPhotoUrl,
                    doc.has("number_of_pages_median") ? doc.get("number_of_pages_median").asInt() : null,
                    firstText(doc, "language", null),
                    firstText(doc, "publisher", null)));
        }

        return results;
    }

    private String firstText(JsonNode node, String field, String fallback) {
        if (node.has(field) && node.get(field).isArray() && !node.get(field).isEmpty()) {
            return node.get(field).get(0).asText();
        }
        return fallback;
    }

    private String textOrNull(JsonNode node, String field) {
        return node.has(field) ? node.get(field).asText() : null;
    }
}
