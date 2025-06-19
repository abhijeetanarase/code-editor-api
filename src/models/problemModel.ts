import mongoose, { Schema, Document, Types } from "mongoose";
export interface IExample {
    input: string,
    output: string,
    explanation?: string
}

export interface ITestCase {
    input: string,
    output: string,
    isHidden?: boolean
}


export interface IProblem extends Document {
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    constraints: string[];
    starterCode: string;
    solutionCode?: string;
    author: Types.ObjectId;
    examples: IExample[];
    testCases: ITestCase[];

}



const exampleSchema = new Schema<IExample>(
    {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String },
    },
    { _id: false } // Prevent separate _id for each example
);




const testCaseSchema = new Schema<ITestCase>(
    {
        input: { type: String, required: true },
        output: { type: String, required: true },
        isHidden: { type: Boolean, default: false },
    },
    { _id: false }
);




const problemSchema = new Schema<IProblem>(
    {
        title: { type: String, required: true, unique: true, trim: true },
        description: { type: String, required: true },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            required: true,
        },
        tags: { type: [String], default: [] },
        constraints: { type: [String], default: [] },
        starterCode: { type: String, required: true },
        solutionCode: { type: String },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        examples: { type: [exampleSchema], default: [] },
        testCases: { type: [testCaseSchema], default: [] },
    },
    { timestamps: true }
);



export default mongoose.model<IProblem>('Problem', problemSchema);