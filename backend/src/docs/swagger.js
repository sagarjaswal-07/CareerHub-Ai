const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CareerHub AI API",
      version: "1.0.0",
      description:
        "AI Powered Career Platform APIs for Resume Analysis, JD Matching, ATS Optimization and Career Growth",
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Local Development Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            role: {
              type: "string",
            },
          },
        },

        Resume: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            fileUrl: {
              type: "string",
            },
            isDefault: {
              type: "boolean",
            },
          },
        },

        JobMatch: {
          type: "object",
          properties: {
            matchScore: {
              type: "number",
            },
            matchedSkills: {
              type: "array",
              items: {
                type: "string",
              },
            },
            missingSkills: {
              type: "array",
              items: {
                type: "string",
              },
            },
            suggestions: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    paths: {
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register User",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "name",
                    "email",
                    "password",
                  ],
                  properties: {
                    name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description:
                "User registered successfully",
            },
          },
        },
      },

      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login User",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "email",
                    "password",
                  ],
                  properties: {
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
            },
          },
        },
      },

      "/auth/me": {
        get: {
          tags: ["Auth"],
          summary: "Get Current User",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description:
                "User fetched successfully",
            },
          },
        },
      },

      "/resumes/upload": {
        post: {
          tags: ["Resume"],
          summary: "Upload Resume",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                    },
                    resume: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description:
                "Resume uploaded successfully",
            },
          },
        },
      },

      "/resumes": {
        get: {
          tags: ["Resume"],
          summary: "Get All User Resumes",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description:
                "Resumes fetched successfully",
            },
          },
        },
      },

      "/resumes/{resumeId}": {
        get: {
          tags: ["Resume"],
          summary: "Get Resume By Id",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "resumeId",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description:
                "Resume fetched successfully",
            },
          },
        },

        delete: {
          tags: ["Resume"],
          summary: "Delete Resume",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "resumeId",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description:
                "Resume deleted successfully",
            },
          },
        },
      },

      "/resumes/{resumeId}/default": {
        patch: {
          tags: ["Resume"],
          summary: "Set Default Resume",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "resumeId",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description:
                "Default resume updated",
            },
          },
        },
      },

      "/resumes/analysis/{resumeId}/analyze": {
        post: {
          tags: ["ATS Analysis"],
          summary: "Analyze Resume ATS Score",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "resumeId",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description:
                "ATS analysis completed",
            },
          },
        },
      },

      "/resumes/jd-match/analyze": {
        post: {
          tags: ["JD Match"],
          summary:
            "Analyze Resume Against Job Description",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "resumeId",
                    "jobDescription",
                  ],
                  properties: {
                    resumeId: {
                      type: "string",
                    },
                    jobDescription: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description:
                "JD match completed",
            },
          },
        },
      },

      "/resumes/jd-match/history": {
        get: {
          tags: ["JD Match"],
          summary: "Get Match History",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description:
                "Match history fetched",
            },
          },
        },
      },

      "/resumes/jd-match/{matchId}": {
        get: {
          tags: ["JD Match"],
          summary: "Get Match Details",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "matchId",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description:
                "Match details fetched",
            },
          },
        },
      },
    },
  },

  apis: [],
};

module.exports = swaggerJSDoc(options);