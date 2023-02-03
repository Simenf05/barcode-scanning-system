from ms_active_directory import ADDomain

domain = ADDomain('')

machine_name = 'simen_pc'

session1 = domain.create_session_as_computer(machine_name)

