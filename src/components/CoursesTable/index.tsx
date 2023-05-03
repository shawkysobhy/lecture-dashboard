import { useState } from 'react';
import { coursesTableColumns } from 'mockup';
import { Stack } from '@mui/system';
import {
	DoDisturbOnOutlined,
	HighlightOffOutlined,
	SettingsOutlined,
	PeopleAltOutlined,
	CheckCircleOutlineOutlined,
} from '@mui/icons-material';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	Pagination,
} from '@mui/material';
import { CoursesBody } from 'models';
import {
	CustomTableCell,
	CustomTableRow,
	EditCourseModal,
	LoadingErrorPlaceholder,
} from 'components';
import { useNavigate } from 'react-router-dom';
import { useCoursesList } from 'hooks';

interface CoursesTableProps {
	setCoursesData: React.Dispatch<React.SetStateAction<CoursesBody[]>>;
	setSelectedCourse: React.Dispatch<React.SetStateAction<CoursesBody>>;
	selectedCourse: CoursesBody;
}

export const CoursesTable = ({
	selectedCourse,
	setSelectedCourse,
	setCoursesData,
}: CoursesTableProps) => {
	const { data: courses = [], isLoading, isError } = useCoursesList();
	const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
	const navigate = useNavigate();
	const handleDeleteCourse = (id: string) => {
		setCoursesData((prev) => prev.filter((course) => course.id !== id));
	};
	const handleToggleStatus = (id: string) => {
		setCoursesData((prev) =>
			prev.map((course) => {
				if (course.id === id) {
					return {
						...course,
						status: course.status === 'active' ? 'inactive' : 'active',
					};
				}
				return course;
			})
		);
	};

	const handleNavigate = (id: string) => navigate(`/courses/${id}`);

	return (
		<>
			<LoadingErrorPlaceholder
				height="50vh"
				isError={isError}
				isLoading={isLoading}
			>
				<Table
					sx={{
						mt: 4,
						width: '100%',
						overflowY: 'auto',
						borderSpacing: '0 15px !important',
						borderCollapse: 'separate',
					}}
				>
					<TableHead
						sx={{
							backgroundColor: 'primary.main',
						}}
					>
						<TableRow>
							{coursesTableColumns.map((column) => (
								<TableCell
									sx={{
										color: 'white',
										textAlign: 'center',
										border: '4px solid white',
									}}
									key={column.id}
								>
									<Typography
										color="white"
										fontSize="20px"
										fontWeight="bold"
										variant="h4"
									>
										{column.label}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{courses.length === 0 ? (
							<TableRow>
								<CustomTableCell colSpan={12}>
									<Typography variant="h4" fontWeight="bold">
										No courses found
									</Typography>
								</CustomTableCell>
							</TableRow>
						) : (
							courses.map((row) => (
								<CustomTableRow key={row.id}>
									<CustomTableCell
										cursor="pointer"
										onClick={() => {
											handleNavigate(row.id);
										}}
									>
										{row.courseName}
									</CustomTableCell>
									<CustomTableCell
										cursor="pointer"
										onClick={() => {
											handleNavigate(row.id);
										}}
									>
										{row.category}
									</CustomTableCell>
									<CustomTableCell
										cursor="pointer"
										onClick={() => {
											handleNavigate(row.id);
										}}
									>
										{row.lastUpdated}
									</CustomTableCell>
									<CustomTableCell
										cursor="pointer"
										onClick={() => {
											handleNavigate(row.id);
										}}
										color={row.status === 'active' ? '#6aa84f' : '#FF0000'}
									>
										{row.status}
									</CustomTableCell>
									<CustomTableCell width="200px">
										<Stack direction="row" justifyContent="space-around">
											<SettingsOutlined
												sx={{
													height: '30px',
													width: '30px',
												}}
												onClick={() => {
													setIsEditCourseOpen(true);
													setSelectedCourse(row);
												}}
												cursor="pointer"
												color="primary"
											/>
											<HighlightOffOutlined
												sx={{
													height: '30px',
													width: '30px',
												}}
												onClick={() => handleDeleteCourse(row.id)}
												cursor="pointer"
												color="primary"
											/>
											{row.status === 'active' ? (
												<DoDisturbOnOutlined
													sx={{
														height: '30px',
														width: '30px',
													}}
													onClick={() => handleToggleStatus(row.id)}
													cursor="pointer"
													color="primary"
												/>
											) : (
												<CheckCircleOutlineOutlined
													sx={{
														height: '30px',
														width: '30px',
													}}
													onClick={() => handleToggleStatus(row.id)}
													cursor="pointer"
													color="primary"
												/>
											)}
											<PeopleAltOutlined
												sx={{
													height: '30px',
													width: '30px',
												}}
												cursor="pointer"
												color="primary"
											/>
										</Stack>
									</CustomTableCell>
								</CustomTableRow>
							))
						)}
					</TableBody>
				</Table>
				{courses.length > 0 && (
					<Pagination
						page={1}
						count={10}
						sx={{
							mt: 4,
							display: 'flex',
							justifyContent: 'center',
						}}
					/>
				)}
				<EditCourseModal
					handleSave={setCoursesData}
					editedCourse={selectedCourse}
					handleClose={() => {
						setIsEditCourseOpen(false);
					}}
					open={isEditCourseOpen}
				/>
			</LoadingErrorPlaceholder>
		</>
	);
};
