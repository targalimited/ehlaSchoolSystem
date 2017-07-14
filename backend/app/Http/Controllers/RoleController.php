<?php

namespace App\Http\Controllers;

use App\Permission;
use App\Role;
use App\User;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    //
    public function postRole(Request $request)
    {

        $owner = new Role();
        $owner->name = $request->name;
        $owner->display_name = $request->display_name; // optional
        $owner->description = $request->description; // optional
        $owner->save();

        return return_success();

    }

    public function deleteRole(Request $request)
    {

        $role = Role::findOrFail($request->id); // Pull back a given role

        // Regular Delete
        $role->delete(); // This will work no matter what
    }

    public function postPermission(Request $request){
        $editUser = new Permission();
        $editUser->name         = $request->name;//'edit-user';
        $editUser->display_name = $request->display_name; //'Edit Users'; // optional
        // Allow a user to...
        $editUser->description  = $request->description; //'edit existing users'; // optional
        $editUser->save();

        return return_success();
    }

    public function attachPermission(Request $request){
        $role_id = $request->role_id;
        $permission_id = $request->permission_id;

        $role = Role::find($role_id);
        $role->perms()->sync([$permission_id]);

        return return_success();
    }

    public function attachRole(Request $request){
        $user = User::where('id',$request->user_id)->first();
        $user->roles()->attach($request->role_id);

        return return_success();
    }
}
