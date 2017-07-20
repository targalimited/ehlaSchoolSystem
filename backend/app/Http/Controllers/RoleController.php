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

    public function putRole(Request $request)
    {
        $owner = Role::findOrFail($request->id);
        $owner->name = $request->name;
        $owner->display_name = $request->display_name; // optional
        $owner->description = $request->description; // optional
        $owner->save();

        return return_success();

    }

    public function deleteRole(Request $request)
    {

        $role = Role::findOrFail($request->id); // Pull back a given role
        // Regular Delete, Delete relate role_permission, role_user and role together
        $role->delete(); // This will work no matter what
    }

    public function readRole(Request $request){
        $role = Role::all();
        $result['data'] = $role;
        return json($result);
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

    public function putPermission(Request $request)
    {
        $owner = Permission::findOrFail($request->id);
        $owner->name = $request->name;
        $owner->display_name = $request->display_name; // optional
        $owner->description = $request->description; // optional
        $owner->save();

        return return_success();

    }

    public function deletePermission(Request $request)
    {

        $role = Permission::findOrFail($request->id); // Pull back a given role
        // Regular Delete, Delete relate role_permission,  permission together
        $role->delete(); // This will work no matter what
        return return_success();
    }

    public function readPermission(Request $request){
        $role = Permission::all();
        $result['data'] = $role;
        return json($result);
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
