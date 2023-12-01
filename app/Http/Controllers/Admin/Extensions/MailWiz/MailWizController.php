<?php

namespace App\Http\Controllers\Admin\Extensions\MailWiz;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;


class MailWizController extends Controller
{
    public function uploadUrl(Request $request)
    {
        $filename = $request->json('filename');
        $width = $request->json('width');
        $height = $request->json('height');

        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        if ($extension !== 'png') {
            $filename .= '.png';
        }

        $presignedPost = [
            'fields' => [
                'size' => ($width ?? 500) . 'x' . ($height ?? 500),
                'filename' => $filename,
                'width' => $width ?? 500,
                'height' => $height ?? 500
            ],
        ];

        return response()->json([
            'data' => [
                'presignedPost' => $presignedPost,
            ],
        ]);
    }

    public function upload(Request $request)
    {
        $file = $request->file('file');
        $path = 'mailwiz/images';
        $size = $request->input('size');
        $filename = $request->input('filename');

        try {
            $uploadedFilename = uploadImg($file, $path, $size, null, $filename, null);
        } catch (\Exception $exp) {
            return response()->json([
                'success' => false,
                'message' => 'Image upload failed',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded successfully',
            'image' => $uploadedFilename,
            'key' => $uploadedFilename
        ]);
    }

    public function save(Request $request)
    {
        $key = $request->json('key');
        $location = url('/mailwiz/images/' . $request->json('key'));
        $userId = $request->json('userId');
        $width = $request->json('width');
        $height = $request->json('height');
        $source = $request->json('source');
        $contentType = $request->json('contentType');
        $size = $request->json('size');

        return response()->json([
            'success' => true,
            'data' => [
                'key' => $key,
                'location' => $location,
                'userId' => $userId,
                'width' => $width,
                'height' => $height,
                'source' => $source,
                'contentType' => $contentType,
                'size' => $size
            ]
        ]);
    }

    public function fetchImage(Request $request)
    {
        $url = $request->query('url');
        $siteUrl = url('/');

        if (!$url) {
            return response()->json([
                'error' => 'URL parameter is missing.'
            ], 400);
        }

        if (Str::startsWith($url, $siteUrl)) {
            return redirect($url);
        }

        try {
            $response = Http::timeout(60)->get($url);

            if ($response->failed()) {
                throw new Exception('Failed to fetch image.');
            }

            $contentType = $response->header('Content-Type');
            $content = $response->body();

            return response($content, 200, [
                'Content-Type' => $contentType,
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Headers' => 'Content-Type',
            ]);
        } catch (Exception $e) {
            return redirect($url);
        }
    }

    public function images(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage');

        $imageDirectoryPath = public_path('mailwiz/images');
        $files = array_diff(scandir($imageDirectoryPath), ['.', '..']);
        $imageFiles = array_filter($files, function ($file) {
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            return in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'bmp']);
        });
        $totalImages = count($imageFiles);
        $offset = ($page - 1) * $perPage;
        $slicedImages = array_slice($imageFiles, $offset, $perPage);

        $response = [
            'success' => true,
            'data' => array_map(function ($file) {
                return [
                    'id' => basename($file),
                    'location' => url('mailwiz/images/' . $file),
                    'filename' => $file,
                    'source' => 'user',
                ];
            }, $slicedImages),
            'page' => $page,
            'perPage' => $perPage,
            'hasMore' => $totalImages > $offset + $perPage,
            'total' => $totalImages,
        ];

        return response()->json($response);
    }


    public function deleteImage(Request $request)
    {
        $imageDirectoryPath = public_path('mailwiz/images');
        $imagePath = $imageDirectoryPath . '/' . $request->json('id');

        try {
            if (File::exists($imagePath)) {
                File::delete($imagePath);

                return response()->json([
                    'success' => true,
                    'message' => 'Image deleted successfully.',
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Image not found.',
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Image delete failed.',
            ], 500);
        }
    }

    public function auth(Request $request)
    {
        return response()->json([
            "success" => true,
            "data" => [
                "token" => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InByb2plY3RJZCI6MTU3MzY1fSwiaWF0IjoxNjgzMTUzNjgxfQ.UtvDRoM6Wtn2DCKsEYuGs1wZZW7ZGiemcijCGEG04ZU"
            ]
        ]);
    }

    /*
    */
    public function session(Request $request)
    {
        return response()->json([
            "success" => true,
            "data" => [
                "token" => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InByb2plY3RJZCI6MTU3MzY1LCJlbnRpdGxlbWVudHMiOnsiYnJhbmRpbmciOnRydWUsImFsbG93ZWREb21haW5zIjoxLCJhbGxvd2VkUHJvamVjdHMiOjEsImN1c3RvbVRvb2xzIjoxLCJjdXN0b21UYWJzIjowLCJjdXN0b21CbG9ja3MiOjEsInVwbG9hZE1heFNpemUiOjIwMDAwMDAsInRlYW1MaW1pdCI6MTAwMCwidGVtcGxhdGVGb2xkZXJzIjoxMDAwLCJjYW1wYWlnbkZvbGRlcnMiOjEwMDAsImN1c3RvbU1lcmdlVGFncyI6MTAwMCwiZXhwb3J0IjpmYWxzZSwic21hcnRIZWFkaW5ncyI6dHJ1ZSwic21hcnRUZXh0Ijp0cnVlLCJzbWFydEJ1dHRvbnMiOnRydWUsIm1hZ2ljSW1hZ2UiOnRydWUsInNlbmRUZXN0RW1haWwiOmZhbHNlfSwiaWQiOiIifSwiaWF0IjoxNjgzMTUzODExfQ.lQ8ofN2iUjI367JiVqmMt0pYjLdH4K80lCuAbI-DKek",
                "user" => [
                    "id" => "1"
                ],
                "project" => [
                    "id" => 1,
                    "name" => "MashDiv",
                    "storage" => true,
                    "tools" => [],
                    "fonts" => [
                        [
                            "label" => "Raleway",
                            "value" => "'Raleway',sans-serif",
                            "url" => "https://fonts.googleapis.com/css?family=Raleway:400,700",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Cabin",
                            "value" => "'Cabin',sans-serif",
                            "url" => "https://fonts.googleapis.com/css?family=Cabin:400,700",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Pacifico",
                            "value" => "'Pacifico',cursive",
                            "url" => "https://fonts.googleapis.com/css?family=Pacifico",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Lato",
                            "value" => "'Lato',sans-serif",
                            "url" => "https://fonts.googleapis.com/css?family=Lato:400,700",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Old Standard TT",
                            "value" => "'Old Standard TT',serif",
                            "url" => "https://fonts.googleapis.com/css?family=Old+Standard+TT:400,700",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Montserrat",
                            "value" => "'Montserrat',sans-serif",
                            "url" => "https://fonts.googleapis.com/css?family=Montserrat:400,700",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Crimson Text",
                            "value" => "'Crimson Text',serif",
                            "url" => "https://fonts.googleapis.com/css?family=Crimson+Text:400,700",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Open Sans",
                            "value" => "'Open Sans',sans-serif",
                            "url" => "https://fonts.googleapis.com/css?family=Open+Sans:400,700",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Source Sans Pro",
                            "value" => "'Source Sans Pro',sans-serif",
                            "url" => "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Rubik",
                            "value" => "'Rubik',sans-serif",
                            "url" => "https://fonts.googleapis.com/css?family=Rubik:400,700",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Playfair Display",
                            "value" => "'Playfair Display',serif",
                            "url" => "https://fonts.googleapis.com/css?family=Playfair+Display:400,700",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Lobster Two",
                            "value" => "'Lobster Two',cursive",
                            "url" => "https://fonts.googleapis.com/css?family=Lobster+Two:400,700",
                            "defaultFont" => true,
                            "weights" => [
                                400,
                                700
                            ]
                        ],
                        [
                            "label" => "Times New Roman",
                            "value" => "times new roman,times",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Verdana",
                            "value" => "verdana,geneva",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Terminal",
                            "value" => "terminal,monaco",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Trebuchet MS",
                            "value" => "trebuchet ms,geneva",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Tahoma",
                            "value" => "tahoma,arial,helvetica,sans-serif",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Impact",
                            "value" => "impact,chicago",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Helvetica",
                            "value" => "helvetica,sans-serif",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Georgia",
                            "value" => "georgia,palatino",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Symbol",
                            "value" => "symbol",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Courier New",
                            "value" => "courier new,courier",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Comic Sans MS",
                            "value" => "comic sans ms,sans-serif",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Arial Black",
                            "value" => "arial black,AvenirNext-Heavy,avant garde,arial",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Andale Mono",
                            "value" => "andale mono,times",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Arial",
                            "value" => "arial,helvetica,sans-serif",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ],
                        [
                            "label" => "Book Antiqua",
                            "value" => "book antiqua,palatino",
                            "url" => "",
                            "defaultFont" => true,
                            "weights" => null
                        ]
                    ],
                    "mergeTags" => [],
                    "overrideDefaultFeatures" => []
                ],
                "subscription" => [
                    "status" => "ACTIVE",
                    "entitlements" => [
                        "branding" => false,
                        "allowedDomains" => 1000,
                        "allowedProjects" => 1000,
                        "customTools" => 1000,
                        "customTabs" => 1000,
                        "customBlocks" => 1000,
                        "uploadMaxSize" => 200000000,
                        "teamLimit" => 1000000,
                        "templateFolders" => 1000000,
                        "campaignFolders" => 1000000,
                        "customMergeTags" => 1000000,
                        "export" => true,
                        "smartHeadings" => true,
                        "smartText" => true,
                        "smartButtons" => true,
                        "magicImage" => true,
                        "sendTestEmail" => true,
                        "imageEditor" => true,
                        "userUploads" => true,
                        "stockImages" => [
                            "enabled" => true,
                            "safeSearch" => true,
                            "defaultSearchTerm" => "people"
                        ],
                        "audit" => true,
                        "pageAnchors" => true,
                        "undoRedo" => true,
                        "sendTestEmail" => true,
                        "textEditor" => [
                            "spellChecker" => true,
                            "tables" => true,
                            "cleanPaste" => true,
                            "emojis" => true,
                            "inlineFontControls" => true,
                            "preheaderText" => true
                        ],
                        "smartMergeTags" => true,
                        "svgImageUpload" => true,

                    ],
                    "items" => [],
                    "addons" => [
                        "timer" => [
                            "enabled" => true,
                            "countdown" => [
                                "value" => [
                                    "countdownUrl" => "/mailwiz/countdown/countdown.gif",
                                ]
                            ]
                        ],
                        "video" => [
                            "enabled" => true,
                        ],
                        "social" => [
                            "enabled" => true,
                        ]
                    ]
                ],
                "isAuthenticated" => true
            ]
        ]);
    }
}
