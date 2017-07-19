<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id = null)
    {
        if ($id == null) {
            return Item::orderBy('id', 'asc')->get();
        } else {
            return $this->show($id);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $item = new Item;

        $item->title = $request->input('title');

        if ($request->input('description'))
            $item->description = $request->input('description');
        else
            $item->description = '';

        if ($request->input('price'))
            $item->price = $request->input('price');
        else
            $item->price = 0;

        $image = $request->file('image');

        if ($image) {
            $name = $image->getClientOriginalName();

            $image->move('uploads', $name);

            $item->image = '/uploads/'.$name;
            $addMess = ". File ". $name ." upload";
        } else {
            $item->image = '';
            $addMess = '';
        }

        $item->save();

        return "Success updating item #" . $item->id . $addMess;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Item::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = Item::find($id);

        $item->title = $request->input('title');

        if ($request->input('description'))
            $item->description = $request->input('description');
        else
            $item->description = '';

        if ($request->input('price'))
            $item->price = $request->input('price');
        else
            $item->price = 0;

        $image = $request->file('image');

        if ($image) {
            $name = $image->getClientOriginalName();

            $image->move('uploads', $name);

            $item->image = '/uploads/'.$name;
            $addMess = ". File ". $name ." upload";
        } else {
            $item->image = Item::find($id)->image;
            $addMess = '';
        }

        $item->save();

        return "Success updating item #" . $item->id . $addMess;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if ($id) {
            $item = Item::find($id);

            $item->delete();

            return "Item record successfully deleted #" . $id;
        }
    }
}
