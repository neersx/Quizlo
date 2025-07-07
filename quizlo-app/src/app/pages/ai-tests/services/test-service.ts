import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TestDetailsDto, CreateTestRequest, TestSubmissionResultDto, QuestionModel } from '../model/questions.model';
import { AnswerPayload, SubmitAnswerDto, SubmitTestRequest } from '../model/answer.model';
import { ApiResponse } from '../../../models/api-response.model';
import { TestDetailsModel } from '../model/tests.model';

@Injectable({ providedIn: 'root' })
export class TestService {
  private baseUrl = `${environment.apiUrl}/tests`;

  constructor(private http: HttpClient) {}

  getTests(): Observable<TestDetailsDto[]> {
    return this.http.get<TestDetailsDto[]>(this.baseUrl);
  }

  getTest(id: number): Observable<TestDetailsDto> {
    return this.http.get<TestDetailsDto>(`${this.baseUrl}/${id}`);
  }

  getTestQuestions(testId: number): Observable<ApiResponse<QuestionModel[]>> {
    return this.http.get<ApiResponse<QuestionModel[]>>(`${this.baseUrl}/${testId}/questions`);
    // return of(this.mockResponseQuestions);
  }

  getTestResult(id: number): Observable<TestDetailsDto> {
    return this.http.get<TestDetailsDto>(`${this.baseUrl}/result/${id}`);
  }

  createTest(request: CreateTestRequest): Observable<any> {
    return this.http.post<TestDetailsDto>(this.baseUrl, request);
    // return of(this.mockResponseQuestions);
  }

  createInitialTest(request: CreateTestRequest): Observable<any> {
    return this.http.post<TestDetailsDto>(`${this.baseUrl}/create-initial-test`, request);
  }

  submitTestAnswers(testId: number | undefined, test: SubmitTestRequest): Observable<TestSubmissionResultDto> {
    const url = `${this.baseUrl}/${testId}/submit`;
    return this.http.post<TestSubmissionResultDto>(url, test);
  }

    // Paste your hardcoded response here
    private mockResponseQuestions: ApiResponse<QuestionModel[]> = {
        "isSuccess": true,
        "data": [
            {
                "id": 0,
                "questionText": "Which of the following is primarily responsible for providing shear strength in concrete?",
                "questionNo": 1,
                "optionsJson": "[\"A. Cement matrix\",\"B. Aggregates\",\"C. Reinforcing steel\",\"D. Water-cement ratio\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Reinforcing steel provides the tensile and shear strength in reinforced concrete. It resists shear stresses effectively. (PC Sreenivasan, Reinforced Concrete Design)",
                "correctOptionIds": "C",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Cement matrix",
                    "B. Aggregates",
                    "C. Reinforcing steel",
                    "D. Water-cement ratio"
                ]
            },
            {
                "id": 0,
                "questionText": "In thermodynamics, the Carnot cycle operates between two reservoirs at 300K and 600K. What is the maximum efficiency of this cycle?",
                "questionNo": 2,
                "optionsJson": "[\"A. 50%\",\"B. 66.7%\",\"C. 33.3%\",\"D. 80%\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Carnot efficiency = 1 - T_c/T_h = 1 - 300/600 = 0.5 or 50%. So, the correct is 50%, but given options, B (66.7%) is incorrect; actual correct answer is A. 50%. Adjusting based on options: answer is A.",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. 50%",
                    "B. 66.7%",
                    "C. 33.3%",
                    "D. 80%"
                ]
            },
            {
                "id": 0,
                "questionText": "Which structure is most suitable for absorbing seismic energy in earthquake-resistant design?",
                "questionNo": 3,
                "optionsJson": "[\"A. Rigid frame\",\"B. Damped structure\",\"C. Shear wall\",\"D. Base isolator\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Base isolators absorb seismic energy, reducing transfer to the structure. They are effective in earthquake-resistant design. (Earthquake Engineering, Pandey & Bhargava)",
                "correctOptionIds": "D",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Rigid frame",
                    "B. Damped structure",
                    "C. Shear wall",
                    "D. Base isolator"
                ]
            },
            {
                "id": 0,
                "questionText": "What is the primary purpose of a Fourier Transform in signal processing?",
                "questionNo": 4,
                "optionsJson": "[\"A. To filter noise\",\"B. To convert time domain signals to frequency domain\",\"C. To compress data\",\"D. To amplify signals\"]",
                "type": 0,
                "difficulty": "Easy",
                "explanation": "Fourier Transform converts signals from the time domain to the frequency domain, facilitating analysis of frequency components. (Signals and Systems, Oppenheim & Willsky)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 1,
                "minusMarks": null,
                "options": [
                    "A. To filter noise",
                    "B. To convert time domain signals to frequency domain",
                    "C. To compress data",
                    "D. To amplify signals"
                ]
            },
            {
                "id": 0,
                "questionText": "Which of the following materials is most suitable for high-temperature applications?",
                "questionNo": 5,
                "optionsJson": "[\"A. Steel\",\"B. Ceramic\",\"C. Aluminum\",\"D. Plastic\"]",
                "type": 0,
                "difficulty": "Easy",
                "explanation": "Ceramics are excellent for high-temperature environments due to their thermal stability and resistance to melting. (Materials Science, Callister)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 1,
                "minusMarks": null,
                "options": [
                    "A. Steel",
                    "B. Ceramic",
                    "C. Aluminum",
                    "D. Plastic"
                ]
            },
            {
                "id": 0,
                "questionText": "Select the correct statements about the second law of thermodynamics.",
                "questionNo": 6,
                "optionsJson": "[\"A. Entropy of an isolated system always decreases\",\"B. Entropy of the universe tends to a maximum\",\"C. It states energy can be completely converted into work\",\"D. It applies only at equilibrium\"]",
                "type": 0,
                "difficulty": "Hard",
                "explanation": "The second law states that the entropy of the universe increases and tends to a maximum; energy conversions are not 100% efficient. (Thermodynamics, Zemansky)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 3,
                "minusMarks": null,
                "options": [
                    "A. Entropy of an isolated system always decreases",
                    "B. Entropy of the universe tends to a maximum",
                    "C. It states energy can be completely converted into work",
                    "D. It applies only at equilibrium"
                ]
            },
            {
                "id": 0,
                "questionText": "Identify the type of boundary condition where displacement is fixed at the edges in a finite element model.",
                "questionNo": 7,
                "optionsJson": "[\"A. Free boundary\",\"B. Fixed boundary\",\"C. Symmetric boundary\",\"D. Roller boundary\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "A fixed boundary condition constrains displacement, preventing movement at the boundary. (Finite Element Method, G. R. Liu)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Free boundary",
                    "B. Fixed boundary",
                    "C. Symmetric boundary",
                    "D. Roller boundary"
                ]
            },
            {
                "id": 0,
                "questionText": "What is the method used to analyze the stability of a structure subjected to buckling?",
                "questionNo": 8,
                "optionsJson": "[\"A. Eigenvalue analysis\",\"B. Finite difference method\",\"C. Modal analysis\",\"D. Stress-strain curve\"]",
                "type": 0,
                "difficulty": "Hard",
                "explanation": "Eigenvalue analysis is used to determine buckling load factors for structures under compression. (Structural Stability, Timoshenko)",
                "correctOptionIds": "A",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 3,
                "minusMarks": null,
                "options": [
                    "A. Eigenvalue analysis",
                    "B. Finite difference method",
                    "C. Modal analysis",
                    "D. Stress-strain curve"
                ]
            },
            {
                "id": 0,
                "questionText": "In control systems, what is the significance of the root locus method?",
                "questionNo": 9,
                "optionsJson": "[\"A. To find system steady-state error\",\"B. To analyze system stability as system parameters vary\",\"C. To determine transient response\",\"D. To design controllers\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Root locus plots show how system poles move with parameter variation, indicating stability changes. (Control Systems Engineering, Ogata)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. To find system steady-state error",
                    "B. To analyze system stability as system parameters vary",
                    "C. To determine transient response",
                    "D. To design controllers"
                ]
            },
            {
                "id": 0,
                "questionText": "Which principle is used in the working of a heat pipe?",
                "questionNo": 10,
                "optionsJson": "[\"A. Conduction\",\"B. Convection\",\"C. Evaporative and condensative cycle\",\"D. Radiation\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Heat pipes operate based on phase change (evaporation and condensation) with capillary action to transfer heat efficiently. (Heat Transfer, Incropera & DeWitt)",
                "correctOptionIds": "C",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Conduction",
                    "B. Convection",
                    "C. Evaporative and condensative cycle",
                    "D. Radiation"
                ]
            },
            {
                "id": 0,
                "questionText": "What is the purpose of the Chebyshev polynomials in numerical methods?",
                "questionNo": 11,
                "optionsJson": "[\"A. To approximate functions with minimal error\",\"B. To solve differential equations analytically\",\"C. To optimize material properties\",\"D. To analyze signals in the time domain\"]",
                "type": 0,
                "difficulty": "Easy",
                "explanation": "Chebyshev polynomials are used in polynomial approximation to minimize maximum error. (Numerical Analysis, Lay & Lay)",
                "correctOptionIds": "A",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 1,
                "minusMarks": null,
                "options": [
                    "A. To approximate functions with minimal error",
                    "B. To solve differential equations analytically",
                    "C. To optimize material properties",
                    "D. To analyze signals in the time domain"
                ]
            },
            {
                "id": 0,
                "questionText": "Which is NOT a characteristic of an ideal gas?",
                "questionNo": 12,
                "optionsJson": "[\"A. No intermolecular forces\",\"B. Obeys Boyle\\u0027s law at constant temperature\",\"C. Compressed to a solid\",\"D. Follows the ideal gas law PV=nRT\"]",
                "type": 0,
                "difficulty": "Easy",
                "explanation": "An ideal gas cannot be compressed into a solid; it describes gases only. (Thermodynamics, Sonntag)",
                "correctOptionIds": "C",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 1,
                "minusMarks": null,
                "options": [
                    "A. No intermolecular forces",
                    "B. Obeys Boyle's law at constant temperature",
                    "C. Compressed to a solid",
                    "D. Follows the ideal gas law PV=nRT"
                ]
            },
            {
                "id": 0,
                "questionText": "In signal processing, what does a low-pass filter do?",
                "questionNo": 13,
                "optionsJson": "[\"A. Passes high-frequency signals\",\"B. Passes low-frequency signals\",\"C. Blocks all signals\",\"D. Passes all frequencies equally\"]",
                "type": 0,
                "difficulty": "Easy",
                "explanation": "A low-pass filter allows signals with frequencies below a cutoff point, filtering out higher frequencies. (Signal Processing, Proakis & Manolakis)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 1,
                "minusMarks": null,
                "options": [
                    "A. Passes high-frequency signals",
                    "B. Passes low-frequency signals",
                    "C. Blocks all signals",
                    "D. Passes all frequencies equally"
                ]
            },
            {
                "id": 0,
                "questionText": "Which method is most commonly used to solve large systems of linear equations?",
                "questionNo": 14,
                "optionsJson": "[\"A. Gauss elimination\",\"B. Jacobi iterative method\",\"C. LU decomposition\",\"D. All of the above\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "All listed methods are used; LU decomposition is efficient, and iterative methods like Jacobi are used for large systems. (Numerical Linear Algebra, Stewart)",
                "correctOptionIds": "D",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Gauss elimination",
                    "B. Jacobi iterative method",
                    "C. LU decomposition",
                    "D. All of the above"
                ]
            },
            {
                "id": 0,
                "questionText": "Identify the primary function of a diode in electronic circuits.",
                "questionNo": 15,
                "optionsJson": "[\"A. Amplify signals\",\"B. Rectify alternating current\",\"C. Store charge\",\"D. Generate oscillations\"]",
                "type": 0,
                "difficulty": "Easy",
                "explanation": "Diodes allow current in one direction, enabling rectification of AC signals. (Electronics, Floyd)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 1,
                "minusMarks": null,
                "options": [
                    "A. Amplify signals",
                    "B. Rectify alternating current",
                    "C. Store charge",
                    "D. Generate oscillations"
                ]
            },
            {
                "id": 0,
                "questionText": "In Fluid Mechanics, what is the term for the force exerted by a fluid on a surface?",
                "questionNo": 16,
                "optionsJson": "[\"A. Shear stress\",\"B. Pressure\",\"C. Viscosity\",\"D. Bernoulli\\u0027s force\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Pressure is the normal force exerted per unit area by a fluid on a surface. (Fluid Mechanics, Munson)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Shear stress",
                    "B. Pressure",
                    "C. Viscosity",
                    "D. Bernoulli's force"
                ]
            },
            {
                "id": 0,
                "questionText": "Which element is most abundant in the Earth's crust?",
                "questionNo": 17,
                "optionsJson": "[\"A. Silicon\",\"B. Oxygen\",\"C. Aluminum\",\"D. Iron\"]",
                "type": 0,
                "difficulty": "Easy",
                "explanation": "Oxygen is the most abundant element in the Earth's crust, mainly as silicates and oxides. (Geology, Press & Siever)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 1,
                "minusMarks": null,
                "options": [
                    "A. Silicon",
                    "B. Oxygen",
                    "C. Aluminum",
                    "D. Iron"
                ]
            },
            {
                "id": 0,
                "questionText": "The term 'modulus of elasticity' refers to which property?",
                "questionNo": 18,
                "optionsJson": "[\"A. Tensile strength\",\"B. Compressive strength\",\"C. Stress/strain ratio in elastic range\",\"D. Ductility\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Modulus of elasticity measures the ratio of stress to strain in the elastic region of a material. (Mechanics of Materials, Gere & Goodno)",
                "correctOptionIds": "C",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Tensile strength",
                    "B. Compressive strength",
                    "C. Stress/strain ratio in elastic range",
                    "D. Ductility"
                ]
            },
            {
                "id": 0,
                "questionText": "In digital electronics, what is the logic output of an AND gate when both inputs are LOW?",
                "questionNo": 19,
                "optionsJson": "[\"A. HIGH\",\"B. LOW\",\"C. Depends on the circuit\",\"D. Alternates between HIGH and LOW\"]",
                "type": 0,
                "difficulty": "Easy",
                "explanation": "An AND gate outputs HIGH only if all inputs are HIGH; otherwise, LOW. (Digital Logic Design, M. Morris Mano)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 1,
                "minusMarks": null,
                "options": [
                    "A. HIGH",
                    "B. LOW",
                    "C. Depends on the circuit",
                    "D. Alternates between HIGH and LOW"
                ]
            },
            {
                "id": 0,
                "questionText": "Which principle explains the lift generated on an airplane wing?",
                "questionNo": 20,
                "optionsJson": "[\"A. Bernoulli\\u0027s principle\",\"B. Newton\\u0027s third law\",\"C. Archimedes\\u0027 principle\",\"D. Pascal\\u0027s law\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Bernoulli's principle explains lift as a result of velocity increase and pressure decrease above the wing. (Fluid Mechanics, Munson)",
                "correctOptionIds": "A",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Bernoulli's principle",
                    "B. Newton's third law",
                    "C. Archimedes' principle",
                    "D. Pascal's law"
                ]
            },
            {
                "id": 0,
                "questionText": "What type of material is primarily used in the fabrication of semiconductor devices?",
                "questionNo": 21,
                "optionsJson": "[\"A. Copper\",\"B. Silicon\",\"C. Aluminum\",\"D. Gold\"]",
                "type": 0,
                "difficulty": "Easy",
                "explanation": "Silicon is the primary material used due to its semiconducting properties. (Semiconductor Devices, Neamen)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 1,
                "minusMarks": null,
                "options": [
                    "A. Copper",
                    "B. Silicon",
                    "C. Aluminum",
                    "D. Gold"
                ]
            },
            {
                "id": 0,
                "questionText": "Which of the following accurately describes the concept of 'damping' in dynamic systems?",
                "questionNo": 22,
                "optionsJson": "[\"A. Energy addition\",\"B. Energy dissipation\",\"C. Energy transfer\",\"D. Energy storage\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Damping refers to energy dissipation in oscillatory systems, reducing amplitude over time. (Vibration Analysis, Inman)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Energy addition",
                    "B. Energy dissipation",
                    "C. Energy transfer",
                    "D. Energy storage"
                ]
            },
            {
                "id": 0,
                "questionText": "In machine design, what does the factor of safety represent?",
                "questionNo": 23,
                "optionsJson": "[\"A. Maximum load capacity\",\"B. Actual load divided by allowable load\",\"C. Ratio of yield strength to working stress\",\"D. Overdesign margin\"]",
                "type": 0,
                "difficulty": "Hard",
                "explanation": "Factor of safety = Yield strength / Working stress, providing a margin against failure. (Machine Design, Shigley)",
                "correctOptionIds": "C",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 3,
                "minusMarks": null,
                "options": [
                    "A. Maximum load capacity",
                    "B. Actual load divided by allowable load",
                    "C. Ratio of yield strength to working stress",
                    "D. Overdesign margin"
                ]
            },
            {
                "id": 0,
                "questionText": "Which phenomenon is characterized by the rapid increase in temperature due to frictional heating?",
                "questionNo": 24,
                "optionsJson": "[\"A. Combustion\",\"B. Welding\",\"C. Thermal runaway\",\"D. Chatter\"]",
                "type": 0,
                "difficulty": "Hard",
                "explanation": "Welding involves localized rapid heating due to friction or electric current. (Manufacturing Processes, Kalpakjian & Schmid)",
                "correctOptionIds": "B",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 3,
                "minusMarks": null,
                "options": [
                    "A. Combustion",
                    "B. Welding",
                    "C. Thermal runaway",
                    "D. Chatter"
                ]
            },
            {
                "id": 0,
                "questionText": "What is the main advantage of using composite materials?",
                "questionNo": 25,
                "optionsJson": "[\"A. Reduced weight and increased strength\",\"B. Lower cost\",\"C. Easier manufacturing\",\"D. Higher thermal conductivity\"]",
                "type": 0,
                "difficulty": "Medium",
                "explanation": "Composites combine properties to achieve reduced weight and high strength—ideal for aerospace and automotive uses. (Materials Engineering, Callister)",
                "correctOptionIds": "A",
                "selectedOptionIds": null,
                "isCorrect": false,
                "isMultipleSelect": false,
                "marks": 2,
                "minusMarks": null,
                "options": [
                    "A. Reduced weight and increased strength",
                    "B. Lower cost",
                    "C. Easier manufacturing",
                    "D. Higher thermal conductivity"
                ]
            }
        ],
        "message": "Test questions retrieved successfully",
        "statusCode": 200
    };
}
