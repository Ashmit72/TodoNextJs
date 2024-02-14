import { NextResponse } from 'next/server';

import { ConnectDB } from '@/lib/config/db';
import TodoModel from '@/lib/models/TodoModel';

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(req) {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos: todos });
}

export async function POST(req) {
  try {
    const { title, description } = await req.json();
    await TodoModel.create({
      title,
      description,
    });
  } catch (e) {
    console.error("Error Occoured!! " + e);
  }

  return NextResponse.json({ msg: "Todo Created" });
}

export async function DELETE(req) {
  const mongoId = await req.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndDelete(mongoId);

  return NextResponse.json({ msg: "Todo Deleted" });
}

export async function PUT(req) {
    const mongoId = await req.nextUrl.searchParams.get("mongoId");
    await TodoModel.findByIdAndUpdate(mongoId,{
        $set:{
            isCompleted:true
        }
    });
  
    return NextResponse.json({ msg: "Todo Completed" });
  }
  
