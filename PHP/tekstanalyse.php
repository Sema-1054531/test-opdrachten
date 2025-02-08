<?php 
        function analyzeText($input){
            $input = trim($input);

            // Controleer of de input leeg is
        if (empty($input)) {
            return [
                'wordCount' => 0,
                'charCount' => 0,
                'longestWord' => '',
                'shortestWord' => '',
                'averageWordLength' => 0
            ];
        }

            //  Het totaal aantal woorden in de string 
            $words = preg_split('/\s+/', $input);

            $wordCount = count($words);

            // Het totaal aantal karakters, exclusief spaties
             $charCount = strlen(preg_replace('/\s+/', '', $input));
             
             // langste en kortste word
              $longestWord = $words[0];
              $shortestWord = $words[0];

              foreach($words as $word){
                  if(strlen($word) > strlen($longestWord)){
                      $longestWord = $word;
                  }
                  if(strlen($word) < strlen($shortestWord)){
                      $shortestWord = $word;
                  }
              }

              // De gemiddelde lengte van de woorden (exclusief spaties)
              $totalLength = array_sum(array_map('strlen', $words));
              $averageWordLength = $wordCount > 0 ? $totalLength / $wordCount : 0;

                // return array
                return [
                    'wordCount' => $wordCount,
                    'charCount' => $charCount,
                    'longestWord' => $longestWord,
                    'shortestWord' => $shortestWord,
                    'averageWordLength' => $averageWordLength
                ];
        }

        // test
        $input = 'Dit is een lange zin met allemaal woorden van verschillende lengtes';
        $result = analyzeText($input);

        // output
        echo "Tekstanalyse Functie:\n";
        echo "Aantal woorden: " . $result['wordCount'] . "\n";
        echo "Aantal karakters: " . $result['charCount'] . "\n";
        echo "Langste woord: " . $result['longestWord'] . "\n";
        echo "Kortste woord: " . $result['shortestWord'] . "\n";
        echo "Gemiddelde woordlengte: " . number_format($result['averageWordLength'], 2) . "\n";
        
        ?>