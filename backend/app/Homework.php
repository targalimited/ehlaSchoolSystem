<?php

namespace App;

use App\Homework2EngDetail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Homework extends Model {
    use SoftDeletes;
    protected $dates = ['deleted_at'];
	
	protected $table = 'homeworks';
	
	public function insertHomework($param) {	
		self::setValue($this, $param);
		DB::beginTransaction();
		try {
			$this->save();
		
			DB::commit();
		} catch (\Exception $e) {
			DB::rollback();
		}
		
		return;
	}
	
	public function updateHomework($param) {
		self::setValue($this, $param);
		$output = [];
		DB::beginTransaction();
		try {
			$this->save();
			DB::commit();
		} catch (\Exception $e) {
			DB::rollback();
		}
		
		$output = $this->toArray();
		$this->decorateOutput($output);
		
		return $output;
	}
	
	public function setValue(&$obj, $params) {
		$obj['academic_id'] = $params['academic_id'];
		$obj['class_id'] = $params['class_id'];
		$obj['teacher_id'] = $params['teacher_id'];
		$obj['subject_id'] = $params['subject_id'];
		$obj['item_type'] = $params['item_type'];
		$obj['item_id'] = $params['item_id'];
		$obj['homework_type'] = $params['homework_type'];
		$obj['target_id'] = $params['target_id'];
		if (!empty($params['remark'])) {$obj['remark'] = $params['remark'];}
		if (!empty($params['start_date'])) {$obj['start_date'] = date ("Y-m-d H:i:s", strtotime($params['start_date']));}
		if (!empty($params['end_date'])) {$obj['end_date'] = date ("Y-m-d H:i:s", strtotime($params['end_date']));}
	}
	
	public function decorateHomeworkListDetail(&$data, $itemId, $academicId, $classId, $subjectId) {
		$sql  = " SELECT * ";
		$sql .= " FROM ".\DB::getTablePrefix()."homeworks ";
		$sql .= " WHERE item_id = ".$itemId." ";
		$sql .= " AND   academic_id = ".$academicId." ";
		$sql .= " AND   class_id = ".$classId." ";
		$sql .= " AND   subject_id = ".$subjectId."; ";
		
		$assignments = DB::select($sql);
		$assignments = json_decode(json_encode($assignments), true);
		foreach ($data as &$value) {
			foreach ($assignments as $key => $assignment) {
				if ($assignment['target_id'] == $value['id']) {
					$value['assignment_id'] = $assignment['id'];
					$value['target_id'] = $assignment['target_id'];
					$value['remark'] = $assignment['remark'];
					$value['start_date'] = $assignment['start_date'];
					$value['end_date'] = $assignment['end_date'];
					$value['start_date_display'] = $assignment['start_date'];
					$value['end_date_display'] = $assignment['end_date'];
					$value['is_published'] = $assignment['is_published'];
					$value['teacher_id'] = $assignment['teacher_id'];
					
					unset($assignments[$key]);
					
					break;
				}
			}			
		}
	}
	
	public function batch_insert($target_ids, $academic_id, $teacher_id, $class_id, $subject_id, $item_type,
								 $item_id, $homework_type, $remark, $start_date, $end_date, $is_published) {
		
		$sqlInsertArray = [];
		$remark = (isset($remark)) ? " '".$remark."' " : " '' ";
		$start_date = (isset($start_date)) ? "'".date ("Y-m-d H:i:s", strtotime($start_date))."'" : " NULL ";
		$end_date = (isset($end_date)) ? "'".date ("Y-m-d H:i:s", strtotime($end_date))."'" : " NULL ";
		$homework_type = "'".$homework_type."'";
		
		foreach ($target_ids as $target_id) {			
			$sqlInsert = " (".$academic_id.", ".$teacher_id.", ".$class_id.", ".$subject_id.", ".$item_type.", ".$item_id.", ".$homework_type.", ".$target_id.", ".$remark.", ".$start_date.", ".$end_date.", ".$is_published.") ";
			array_push($sqlInsertArray, $sqlInsert);
		}
		
		$sql  = " INSERT INTO ".\DB::getTablePrefix()."homeworks ";
		$sql .= " (academic_id, teacher_id, class_id, subject_id, item_type, item_id, homework_type, target_id, remark, start_date, end_date, is_published) VALUES ";
		
		$sql .= implode(',', $sqlInsertArray);

		$sql .= " ON DUPLICATE KEY UPDATE ";
		$sql .= " start_date = IF(is_published = 1, start_date, VALUES(start_date)), ";
		$sql .= " end_date = IF(is_published = 1, end_date, VALUES(end_date)), ";
		$sql .= " remark = IF(is_published = 1, remark, VALUES(remark)), ";
		$sql .= " is_published = VALUES(is_published); ";
		
		DB::update(DB::raw($sql));
	}
	
	public function get_assignment($target_ids, $academic_id, $teacher_id, $class_id, $subject_id, $item_type, $item_id, $homework_type) {
		$sql  = " SELECT * FROM ".\DB::getTablePrefix()."homeworks ";
		$sql .= " WHERE academic_id = ".$academic_id;
		$sql .= " AND   teacher_id = ".$teacher_id;
		$sql .= " AND   class_id = ".$class_id;
		$sql .= " AND   subject_id = ".$subject_id;
		$sql .= " AND   item_type = '".$item_type."'";
		$sql .= " AND   item_id = ".$item_id;
		$sql .= " AND   homework_type = '".$homework_type."'";
		$sql .= " AND   target_id in (".implode(',', $target_ids).") ";
		
		$assignmentIds = DB::select($sql);
		
		return $assignmentIds;
	}
	
	
	public function get_by($where_param) {
		$sqlWhere = [];
		foreach ($where_param as $key => $value) {
			if ($this->isValidWhereKey($key)) {
				$where = " ".$key." = ".$value." ";
				array_push($sqlWhere, $where);
			} else {
				return null;
			}
		}	
		
		if (empty($sqlWhere)) {return null;}
		
		$sql  = " SELECT * ";
		$sql .= " FROM ".\DB::getTablePrefix()."homeworks ";
		$sql .= " WHERE ".implode(' AND ', $sqlWhere);
				
		//DB::enableQueryLog();
		$data = DB::select($sql);
		if (!empty($data)) {
			return $data[0];
		} else {
			return null;
		}
		//$laQuery = DB::getQueryLog();
		//$lcWhatYouWant = $laQuery[0]['query'];
		//DB::disableQueryLog();

		//dd($laQuery[0]);
		//dd($data);
	}
	
	// ---------------- private function ----------------- //			
	private function decorateOutput(&$output) {
		unset($output['created_at']);
		unset($output['updated_at']);
		unset($output['deleted_at']);
	}
	
	private function isValidWhereKey($key) {
		if ($key == "id" ||
			$key == "academic_id" ||
			$key == "teacher_id" ||
			$key == "class_id" ||
			$key == "subject_id" ||
			$key == "item_id" ||
			$key == "item_type" ||
			$key == "target_id") {
			return true;
		}
		return false;
	}	
	
	private function selectCommonField($data) {
		$data = $data->select(
			"id", 
			"academic_id",
			"teacher_id", 
			"class_id", 
			"subject_id"
			);
	}
	
}
